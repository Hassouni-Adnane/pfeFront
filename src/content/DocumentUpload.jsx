// src/components/DocumentUpload.jsx
import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import styled from "styled-components";

const Container = styled.div`
  margin: 2rem auto;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const DownloadButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  max-width: 400px;
`;
const FileInput = styled.input`
  margin-bottom: 1rem;
`;

const UploadButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`;

const DocumentDetails = styled.div`
  margin-top: 1rem;
  text-align: left;
`;

const CodeBlock = styled.pre`
  background: #070101;
  padding: 0.5rem;
  border-radius: 4px;
  color: white;
  overflow-x: auto;
`;

const PreviewSection = styled.div`
  margin-top: 2rem;
`;

const PreviewIframe = styled.iframe`
  width: 100%;
  height: 600px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const EmbeddedIframeWrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const EmbeddedIframe = styled.iframe`
  width: 100%;
  height: 95vh;
  border: 2px solid #007bff;
  border-radius: 8px;
  min-height: 700px;
`;

const FieldRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0 1rem;
`;

export default function DocumentUpload() {
  const [file, setFile] = useState(null);
  const [workflow, setWorkflow] = useState("parallel"); // 👈 added
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [documentInfo, setDocumentInfo] = useState(null);

  const { token, userId } = useAuth();

  const handleFileChange = (e) => {
    setError("");
    setDocumentInfo(null);
    setFile(e.target.files[0] || null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }
    try {
      if (!token) throw new Error("Not authenticated");
      setUploading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("workflow", workflow); // 👈 required by backend
         if (userId != null) {
        formData.append("user_id", String(userId)); // ✅ ensure string, no .trim()
      }
      

      const res = await fetch("https://localhost:5001/api/documents/embed-send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT set Content-Type when sending FormData; the browser sets the boundary
        },
        body: formData,
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text || res.statusText);

      const json = JSON.parse(text);
      setDocumentInfo({
        documentId: json.document_id,
        embeddedSendingUrl: json.embedded_sending_url || json.embeddedSendingUrl || null,
        previewUrl: json.preview_url || null,
      });
    } catch (err) {
      console.error("Upload error:", err.message);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };


  return (
    <Container>
      <Wrapper>
        <FileInput type="file" accept="application/pdf" onChange={handleFileChange} />

        {/* Workflow + uploader inputs */}
        <FieldRow>
          <label htmlFor="workflow">Workflow:</label>
          <select
            id="workflow"
            value={workflow}
            onChange={(e) => setWorkflow(e.target.value)}
          >
            <option value="parallel">parallel</option>
            <option value="sequential">sequential</option>
          </select>
        </FieldRow>

        <UploadButton onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading…" : "Upload"}
        </UploadButton>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {documentInfo && (
          <>
            <DocumentDetails>
              <p>Document Created</p>
              <CodeBlock>{JSON.stringify(documentInfo, null, 2)}</CodeBlock>
            </DocumentDetails>

            {documentInfo.previewUrl && (
              <PreviewSection>
                <h3>Preview the document:</h3>
                <PreviewIframe src={documentInfo.previewUrl} title="Document Preview" />
              </PreviewSection>
            )}
          </>
        )}
      </Wrapper>

      {documentInfo?.embeddedSendingUrl && (
        <EmbeddedIframeWrapper>
          <h3>Embedded Sending View:</h3>
          <EmbeddedIframe
            src={documentInfo.embeddedSendingUrl}
            title="Embedded Sending"
          />
        </EmbeddedIframeWrapper>
      )}
    </Container>
  );
}
