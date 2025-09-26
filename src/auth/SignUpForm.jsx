import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

const RED = "#D71A28";
const BG = "#F5F7FA";

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${BG};
  position: relative;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial;
`;

const LogoWrap = styled.div`
  position: fixed;
  top: 20px;
  left: 24px;
  z-index: 1000;
  img { width: 200px; height: auto; display: block; }
`;

const Card = styled.form`
  width: 100%;
  max-width: 520px;
  background: #fff;
  border-radius: 16px;
  padding: 36px 40px;
  box-shadow: 0 10px 26px rgba(16, 24, 40, 0.08);
`;

const Title = styled.h2`
  margin: 0 0 20px 0;
  text-align: center;
  font-size: 28px;
  color: #1f2937;
  font-weight: 700;
`;

const Label = styled.label`
  display: block;
  margin: 14px 0 6px;
  font-size: 14px;
  color: #111827;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: box-shadow .2s, border-color .2s;
  &:focus { border-color: ${RED}; box-shadow: 0 0 0 4px rgba(215,26,40,.12); }
`;

const Button = styled.button`
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
  &:hover { background: #b91622; }
  &:active { transform: translateY(1px); }
`;

const ErrorMessage = styled.div`
  margin-top: 12px;
  color: #7a2328;
  background: #fde2e4;
  border: 1px solid #f9c6ca;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  text-align: center;
`;

const SubLink = styled.p`
  margin-top: 14px;
  text-align: center;
  font-size: 14px;
  a { color: ${RED}; text-decoration: none; font-weight: 700; }
  a:hover { text-decoration: underline; }
`;

export default function SignUpForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    jobTitle: "",
    password: ""
  });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const t = await res.json().catch(() => ({}));
        throw new Error(t.message || "Inscription échouée");
      }
      // succès → retour à la page login
      navigate("/login");
    } catch (err) {
      setError(err.message || "Erreur de connexion");
    }
  };

  return (
    <>
      <LogoWrap>
        <img src="/redal.png" alt="Redal" />
      </LogoWrap>

      <Page>
        <Card onSubmit={submit}>
          <Title>Create your account</Title>

          <Label>Full name *</Label>
          <Input
            type="text"
            placeholder="Enter Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <Label>Email *</Label>
          <Input
            type="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <Label>Job title</Label>
          <Input
            type="text"
            placeholder="Enter Your Job Title"
            value={form.jobTitle}
            onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
          />

          <Label>Password *</Label>
          <Input
            type="password"
            placeholder="Choose a Strong Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit">Sign up</Button>

          <SubLink>
            Already have an account? <Link to="/login">Log in</Link>
          </SubLink>
        </Card>
      </Page>
    </>
  );
}
