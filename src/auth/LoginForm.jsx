import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

/* ========= THEME REDAL ========= */
const RED = "#D71A28";
const GRAY = "#7D7D7D";
const BG = "#F5F7FA";

/* ========= LAYOUT ========= */
const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${BG};
  position: relative;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial;
`;

/* Logo fixe en haut-gauche */
const LogoWrap = styled.div`
  position: fixed;
  top: 20px;
  left: 24px;
  z-index: 1000;
  img {
    width: 200px;             /* ← plus grand */
    height: auto;
    display: block;
  }
`;

/* Carte formulaire */
const Card = styled.form`
  && {
    width: 100%;
    max-width: 520px;          /* ← un peu plus large */
    background: #fff;
    border-radius: 16px;
    padding: 36px 40px;
    box-shadow: 0 10px 26px rgba(16, 24, 40, 0.08);
  }
`;

/* Titre */
const Title = styled.h2`
  && {
    margin: 0 0 20px 0;
    text-align: center;
    font-size: 28px;
    line-height: 1.2;
    color: #1f2937;
    font-weight: 700;
  }
`;

/* Label + Input */
const Label = styled.label`
  && {
    display: block;
    margin: 14px 0 6px;
    font-size: 14px;
    color: #111827;
    font-weight: 600;
  }
`;

const Input = styled.input`
  && {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 15px;
    outline: none;
    transition: box-shadow .2s, border-color .2s;
  }
  &:focus {
    border-color: ${RED};
    box-shadow: 0 0 0 4px rgba(215, 26, 40, 0.12);
  }
`;

/* Bouton */
const Button = styled.button`
  && {
    width: 100%;
    margin-top: 18px;
    padding: 12px 14px;
    border: 0;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    background: ${RED};
    cursor: pointer;
    transition: transform .04s ease, background .15s ease;
  }
  &:hover { background: #b91622; }
  &:active { transform: translateY(1px); }
`;

/* Message d'erreur */
const ErrorMessage = styled.div`
  && {
    margin-top: 12px;
    color: #7a2328;
    background: #fde2e4;
    border: 1px solid #f9c6ca;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 14px;
    text-align: center;
  }
`;

/* Lien secondaire */
const SubLink = styled.p`
  && {
    margin-top: 14px;
    text-align: center;
    font-size: 14px;
    color: ${GRAY};
  }
  a {
    color: ${RED};
    text-decoration: none;
    font-weight: 700;
  }
  a:hover { text-decoration: underline; }
`;

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      try {
        const errJson = JSON.parse(err.message);
        setError(errJson.message || "Erreur de connexion");
      } catch {
        setError("Erreur de connexion");
      }
    }
  };

  return (
    <>
      {/* Logo Redal (depuis public/redal.png) */}
      <LogoWrap>
        <img src="/redal.png" alt="Redal" />
      </LogoWrap>

      <Page>
        <Card onSubmit={handleSubmit}>
          <Title>Welcome Back</Title>

          <Label>Email *</Label>
          <Input
            type="email"
            placeholder="Enter your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <Label>Password *</Label>
          <Input
            type="password"
            placeholder="Enter your Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit">Login</Button>

          <SubLink>
          <Link to="/forgot-password">Forgot password?</Link>
          </SubLink>
          <SubLink>
           Dont have an account? <Link to="/signup">Sign up</Link>
          </SubLink>

        </Card>
      </Page>
    </>
  );
}
