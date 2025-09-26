import React, { useEffect, useState, useCallback, useMemo } from "react";
import styled from "styled-components";

const API  = process.env.REACT_APP_API_URL || "http://localhost:5000";

/* ---- Thème ---- */
const RED   = "#D71A28";
const INK   = "#111827";
const MUTED = "#6b7280";
const BG    = "#F5F7FA";

/* ---- Layout ---- */
const Wrap = styled.div`
  padding: 18px;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial;
  color: ${INK};
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 26px rgba(16,24,40,.08);
  padding: 18px;
`;

const Head = styled.div`
  display: flex;
  align-items: end;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: .2px;
`;

const Sub = styled.div`
  color: ${MUTED};
  font-size: 13px;
`;

const Spacer = styled.div`flex: 1;`;

/* ---- Controls ---- */
const Controls = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

const Input = styled.input`
  flex: 1 1 240px;
  min-width: 200px;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: box-shadow .2s, border-color .2s;
  &:focus { border-color:${RED}; box-shadow:0 0 0 4px rgba(215,26,40,.12); }
`;

const Select = styled.select`
  flex: 0 0 180px;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  font-size: 14px;
  outline: none;
  &:focus { border-color:${RED}; box-shadow:0 0 0 4px rgba(215,26,40,.12); }
`;

const Button = styled.button`
  padding: 10px 14px;
  border: 0;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: transform .04s ease, background .15s ease, opacity .15s;
  ${({ variant }) =>
    variant === "primary"
      ? `background:${RED}; color:#fff; &:hover{background:#b91622;}`
      : `background:#eef2f7; color:${INK}; &:hover{background:#e5eaf1;}`}
  &:active { transform: translateY(1px); }
  &:disabled { opacity:.6; cursor:not-allowed; }
`;

/* ---- Table ---- */
const TableWrap = styled.div`
  border: 1px solid #eef2f7;
  border-radius: 12px;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

const Th = styled.th`
  text-align: left;
  font-weight: 700;
  color: ${MUTED};
  background: ${BG};
  padding: 12px 14px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 13px;
`;

const Tr = styled.tr`
  &:hover td { background: #fcfdff; }
`;

const Td = styled.td`
  padding: 12px 14px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
`;

const RowActions = styled.div`
  display: flex; gap: 8px;
`;

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  ${({ status }) => {
    switch (status) {
      case "Approved": return `color:#065f46; background:#d1fae5;`;
      case "Pending":  return `color:#92400e; background:#fef3c7;`;
      case "Archived": return `color:#374151; background:#e5e7eb;`;
      default:         return `color:#374151; background:#e5e7eb;`;
    }
  }}
`;

/* ---- Détails ---- */
const DetailRow = styled.tr` background: #fcfcfd; `;
const DetailCell = styled.td`
  padding: 14px;
  border-top: 1px dashed #e5e7eb;
  color: ${MUTED};
  font-size: 14px;
`;

/* ------------------------------------------------------- */

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // UI state
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(`${API}/api/users`, { headers: { "Cache-Control": "no-cache" } });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setErr("Impossible de charger la liste des utilisateurs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    const onFocus = () => load();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [load]);

  const statusOptions = ["Pending", "Approved", "Archived"];

  const toggleDetails = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  const changeStatus = async (id) => {
    const u = users.find((x) => x.id === id);
    if (!u) return;
    const next = statusOptions[(statusOptions.indexOf(u.status) + 1) % statusOptions.length];
    try {
      const res = await fetch(`${API}/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error();
      setUsers((prev) => prev.map((x) => (x.id === id ? { ...x, status: next } : x)));
    } catch {
      alert("Mise à jour du statut échouée");
    }
  };

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return users
      .filter((u) => (status === "all" ? true : u.status === status))
      .filter((u) =>
        term
          ? `${u.name ?? ""} ${u.email ?? ""} ${u.jobTitle ?? ""}`
              .toLowerCase()
              .includes(term)
          : true
      )
      .sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
  }, [users, q, status]);

  return (
    <Wrap>
      <Head>
        <div>
          <Title>Users</Title>
          <Sub>Manage roles and access — {users.length} total</Sub>
        </div>
        <Spacer />
        <Button onClick={load} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </Head>

      {err && (
        <div style={{ color: "#b91c1c", background:"#fee2e2", border:"1px solid #fecaca",
                      padding:"10px 12px", borderRadius:8, marginBottom:10 }}>
          {err}
        </div>
      )}

      <Card>
        <Controls>
          <Input
            placeholder="Search name, email, job title…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All statuses</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Archived">Archived</option>
          </Select>
        </Controls>

        <TableWrap>
          <Table>
            <thead>
              <tr>
                <Th style={{width:70}}>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th style={{width:140}}>Status</Th>
                <Th style={{width:210}}>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <React.Fragment key={u.id}>
                  <Tr>
                    <Td>{u.id}</Td>
                    <Td>{u.name}</Td>
                    <Td>{u.email}</Td>
                    <Td><Pill status={u.status}>{u.status}</Pill></Td>
                    <Td>
                      <RowActions>
                        <Button onClick={() => toggleDetails(u.id)}>Details</Button>
                        <Button variant="primary" onClick={() => changeStatus(u.id)}>
                          Change status
                        </Button>
                      </RowActions>
                    </Td>
                  </Tr>

                  {expanded[u.id] && (
                    <DetailRow>
                      <DetailCell colSpan={5}>
                        <strong>Job title:</strong> {u.jobTitle || "—"}
                      </DetailCell>
                    </DetailRow>
                  )}
                </React.Fragment>
              ))}

              {!filtered.length && !loading && (
                <tr>
                  <Td colSpan={5} style={{ textAlign: "center", color: MUTED, padding: 22 }}>
                    No users found
                  </Td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableWrap>
      </Card>
    </Wrap>
  );
}
