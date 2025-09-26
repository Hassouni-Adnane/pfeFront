import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

/* ---- Thème ---- */
const RED  = "#D71A28";
const GRAY = "#6b7280";
const API  = process.env.REACT_APP_API_URL || "http://localhost:5000";

/* ---- UI ---- */
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, .55);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Card = styled.form`
  width: 100%;
  max-width: 480px;
  background: #fff;
  border-radius: 16px;
  padding: 36px;
  box-shadow: 0 20px 40px rgba(16,24,40,.18);
  position: relative;
`;

const Close = styled.button`
  position: absolute;
  top: 10px;
  right: 12px;
  border: 0;
  background: transparent;
  color: ${GRAY};
  font-size: 20px;
  cursor: pointer;
`;

const Header = styled.div`
  margin-bottom: 18px;
  text-align: center;
`;

const Title = styled.h3`
  margin: 0 0 6px;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: .2px;
  background: linear-gradient(90deg, ${RED}, ${GRAY});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Sub = styled.p`
  margin: 0 auto 14px;
  color: ${GRAY};
  font-size: 14px;
  max-width: 320px;
`;

const Divider = styled.div`
  height: 3px;
  width: 64px;
  margin: 0 auto 8px;
  border-radius: 999px;
  background: linear-gradient(90deg, ${RED}, #f97316);
  opacity: .9;
`;

const Field = styled.div`
  margin: 10px 6px;
`;

const Label = styled.label`
  display: block;
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
  color: #111827;
  letter-spacing: .2px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
  transition: box-shadow .2s, border-color .2s, background .2s;
  &::placeholder { color: #9ca3af; }
  &:focus {
    border-color: ${RED};
    box-shadow: 0 0 0 4px rgba(215, 26, 40, .12);
    background: #fff;
  }
`;

const Error = styled.div`
  margin: 12px 6px 0;
  color: #7a2328;
  background: #fde2e4;
  border: 1px solid #f9c6ca;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 13px;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  margin: 18px 6px 0;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px 12px;
  border: 0;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: transform .04s ease, background .15s ease, opacity .15s;
  ${({ variant }) =>
    variant === "primary"
      ? `background: ${RED}; color: #fff; &:hover{background:#b91622;}`
      : `background: #e5e7eb; color:#111827; &:hover{background:#d1d5db;}`}
  &:active { transform: translateY(1px); }
  &:disabled { opacity: .6; cursor: not-allowed; }
`;

export default function AdminLoginModal({ onClose }) {
  const navigate = useNavigate();
  const { login } = useAuth(); // on ne l’utilise que si le compte est admin

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  // ESC pour fermer (si pas en chargement)
  useEffect(() => {
    const onKey = (e) => { if (!loading && e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [loading, onClose]);

  // Empêche la fermeture quand on clique dans la carte
  const stop = (e) => e.stopPropagation();

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    const payload = {
      email: String(email).trim().toLowerCase(),
      password,
    };

    try {
      // 1) Peek login (ne change PAS la session)
      const res = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Échec de connexion");

      const u = data.user ?? data;

      // 2) Si pas admin → message, aucune déconnexion
      if (u?.role !== "admin") {
        setError("Accès réservé aux administrateurs.");
        return;
      }

      // 3) C'est bien un admin → on “confirme” la session
      await login(payload); // met à jour le contexte utilisateur
      onClose?.();
      navigate("/admin");
    } catch (err) {
      let msg = "Échec de connexion";
      try {
        const j = JSON.parse(err.message);
        msg = j.message || msg;
      } catch {
        msg = err.message || msg;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Backdrop onClick={!loading ? onClose : undefined}>
      <Card onClick={stop} onMouseDown={stop} onSubmit={handleSubmit}>
        <Close type="button" aria-label="Close" onClick={!loading ? onClose : undefined}>×</Close>

        <Header>
          <Title>Admin Login</Title>
          <Divider />
          <Sub>Access restricted to administrators</Sub>
        </Header>

        <Field>
          <Label>Email *</Label>
          <Input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            required
          />
        </Field>

        <Field>
          <Label>Password *</Label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>

        {error && <Error>{error}</Error>}

        <Row>
          <Button type="button" variant="secondary" onClick={!loading ? onClose : undefined} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Row>
      </Card>
    </Backdrop>
  );
}
