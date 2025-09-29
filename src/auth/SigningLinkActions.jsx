import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "./AuthProvider";

const Row = styled.div`display: inline-flex; align-items: center; gap: 6px; flex-wrap: wrap;`;
const Button = styled.button`
  padding: 6px 10px; border: 1px solid #e5e7eb; border-radius: 8px; background: #fff; cursor: pointer;
  &:hover { background: #f3f4f6; }
  &:disabled { opacity: .6; cursor: not-allowed; }
`;
const SmallInput = styled.input`
  padding: 6px 8px; border: 1px solid #e5e7eb; border-radius: 8px; min-width: 220px;
`;

export default function SigningLinkActions({ documentId }) {
  const { token } = useAuth();                // token = SignNow access_token from context
  const [redirectUri, setRedirectUri] = useState(""); // optional redirect
  const [link, setLink] = useState(null);
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    try {
      if (!documentId) throw new Error("Missing document id");
      if (!token) throw new Error("Missing token in context");
      setCreating(true);

      const res = await fetch("http://localhost:5143/api/signing-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,                    // backend expects { token, documentId, redirectUri }
          documentId,
          redirectUri: redirectUri || undefined,
        }),
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text || `Failed (${res.status})`);
      let json = {}; try { json = JSON.parse(text); } catch {}
      const signingUrl = json.url || json.link || json.signing_link || text;
      setLink(signingUrl);
    } catch (e) {
      alert(e.message || "Could not create signing link");
    } finally {
      setCreating(false);
    }
  };

  const copyToClipboard = async () => {
    try { await navigator.clipboard.writeText(link); alert("Link copied"); }
    catch { alert("Copy failed"); }
  };

  return (
    <Row>
      <SmallInput
        placeholder="Optional redirect URI (e.g., http://localhost:3000/after-sign)"
        value={redirectUri}
        onChange={(e) => setRedirectUri(e.target.value)}
      />
      <Button disabled={creating} onClick={handleCreate}>
        {creating ? "Creating…" : "Create signing link"}
      </Button>
      {link && (
        <>
          <Button onClick={() => window.open(link, "_blank")}>Open</Button>
          <Button onClick={copyToClipboard}>Copy</Button>
        </>
      )}
    </Row>
  );
}
