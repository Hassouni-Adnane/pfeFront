import React from 'react'
import { useAuth } from "./AuthProvider";
import styled from 'styled-components';
import { useState } from 'react';
import { FiKey } from "react-icons/fi"; // icône facultative pour le bouton


// Un bouton stylé minimal (vous pouvez adapter à votre charte CSS)
const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

// Un conteneur stylé pour la zone de token et formulaire
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
`;

// Un champ d’erreur en rouge
const ErrorText = styled.span`
  color: #e74c3c;
  font-size: 0.8rem;
`;

const SignNowToken = () => {

  const { token, setToken } = useAuth();

  // États locaux pour le mini‐formulaire de SignNow
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [basicToken, setBasicToken] = useState("");            // ← ADDED
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Lorsque l’utilisateur soumet le mini‐formulaire
  const handleFetchToken = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5143/api/signnow/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Username: email,
          Password: password,
          basicToken: basicToken,                               // ← ADDED
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Invalid credentials");
      }

      const data = await response.json();
      // data.access_token contient le token Bearer
      setToken(data.access_token);
      localStorage.setItem("signNowToken", data.access_token);
    } catch (err) {
      console.error("Fetch SignNow token failed:", err);
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  // Si un token est déjà présent, on l’affiche et on propose un bouton Reset
  if (token) {
    return (
      <Container>
        <span>SignNow Token:</span>
        <p
          style={{
            background: "#1c0303",
            padding: "2px 4px",
            borderRadius: "3px",
            fontSize: "0.8rem",
          }}
        >
          Token aquired
        </p>
        <Button onClick={() => { setToken(null); localStorage.removeItem("signNowToken"); }}>
          Reset Token
        </Button>
      </Container>
    );
  }

  // Sinon, on affiche le mini‐formulaire pour récupérer un token
  return (
    <Container as="form" onSubmit={handleFetchToken}>
      <input
        type="email"
        placeholder="SignNow Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ padding: "4px 6px", fontSize: "0.9rem" }}
      />
      <input
        type="password"
        placeholder="SignNow Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ padding: "4px 6px", fontSize: "0.9rem" }}
      />
      <input
        type="password"                                         // ← ADDED
        placeholder="Basic token (base64 client_id:client_secret)"
        value={basicToken}
        onChange={(e) => setBasicToken(e.target.value)}
        required
        style={{ padding: "4px 6px", fontSize: "0.9rem" }}
      />
      <Button type="submit" disabled={loading || !email || !password || !basicToken /* ← updated */}>
        {loading ? "En cours…" : <><FiKey />Get Token</>}
      </Button>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
}

export default SignNowToken
