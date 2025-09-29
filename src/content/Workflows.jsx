import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../auth/AuthProvider";
import SigningLinkActions from "../auth/SigningLinkActions";

const Page = styled.div` padding: 24px; `;
const Title = styled.h2` margin: 0 0 16px; `;
const Controls = styled.div` display: flex; gap: 12px; margin-bottom: 14px; flex-wrap: wrap; `;
const Search = styled.input`
  padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 8px; min-width: 240px;
`;
const Small = styled.span` color: #6b7280; font-size: 12px; `;
const Table = styled.table`
  width: 100%; border-collapse: collapse; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;
  th, td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; text-align: left; font-size: 14px; }
  th { background: #f9fafb; font-weight: 800; color: #111827; }
`;
const Button = styled.button`
  padding: 6px 10px; border: 1px solid #e5e7eb; border-radius: 8px; background: #fff; cursor: pointer; margin-right: 6px;
  &:hover { background: #f3f4f6; }
  &:disabled { opacity: .6; cursor: not-allowed; }
`;

export default function Workflows() {
  const { token, userId } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");

  // Load ONLY this user's docs
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        if (userId == null) return;
        const url = `http://localhost:5000/api/documents?userId=${encodeURIComponent(String(userId))}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`List failed: ${res.status}`);
        const data = await res.json();
        if (!alive) return;
        setRows(Array.isArray(data) ? data : []);
      } catch (e) {
        if (alive) setErr(e.message || "Failed to load documents");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [userId]);

  // Ownership + search filter
  const filtered = useMemo(() => {
    const owned = rows.filter(r => {
      const owner = r.userId ?? r.ownerId ?? r.uploaderUserId ?? r.user_id ?? null;
      return String(owner) === String(userId);
    });
    const s = q.trim().toLowerCase();
    if (!s) return owned;
    return owned.filter(r =>
      (r.originalName || "").toLowerCase().includes(s) ||
      (r.workflow || "").toLowerCase().includes(s) ||
      (r.signNowDocumentId || "").toLowerCase().includes(s)
    );
  }, [q, rows, userId]);

  // Download via .NET proxy
  const handleDownload = async (doc) => {
    try {
      if (!doc?.signNowDocumentId) throw new Error("Missing document id");
      if (!token) throw new Error("Not authenticated");
      const url = `https://localhost:5001/api/download/${encodeURIComponent(doc.signNowDocumentId)}`;
      const res = await fetch(url, { method: "GET", headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error(`Download failed: ${res.status} ${await res.text()}`);
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = (doc.originalName && doc.originalName.endsWith(".pdf"))
        ? doc.originalName
        : `${doc.originalName || "document"}-${doc.signNowDocumentId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(a.href);
    } catch (e) {
      alert(e.message || "Download error");
    }
  };

  return (
    <Page>
      <Title>My Documents</Title>

      <Controls>
        <Search
          placeholder="Search by name, id, workflow…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Small>{filtered.length} item(s)</Small>
      </Controls>

      {userId == null && <p><Small>Waiting for user…</Small></p>}
      {loading && <p>Loading…</p>}
      {err && <p style={{ color: "red" }}>{err}</p>}

      {!loading && !err && userId != null && (
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Original name</th>
              <th>Workflow</th>
              <th>Uploaded at</th>
              <th>Size</th>
              <th>SignNow id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => {
              const snId = r.signNowDocumentId;
              return (
                <tr key={r._id || r.id || snId || i}>
                  <td>{r.id ?? i + 1}</td>
                  <td>{r.originalName || <Small>—</Small>}</td>
                  <td>{r.workflow}</td>
                  <td>{r.uploadedAt ? new Date(r.uploadedAt).toLocaleString() : <Small>—</Small>}</td>
                  <td>{typeof r.sizeBytes === "number" ? `${(r.sizeBytes/1024/1024).toFixed(2)} MB` : <Small>—</Small>}</td>
                  <td><Small>{snId}</Small></td>
                  <td>
                    <Button onClick={() => handleDownload(r)}>Download</Button>
                    <SigningLinkActions documentId={snId} />
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr><td colSpan={7}><Small>No documents</Small></td></tr>
            )}
          </tbody>
        </Table>
      )}
    </Page>
  );
}
