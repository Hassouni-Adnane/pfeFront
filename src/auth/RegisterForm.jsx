import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Styled components (same structure as LoginForm)
const StyledForm = styled.form`
  max-width: 400px;
  margin: 100px auto;
  padding: 4pt;
  background: white;
  border-radius: 8pt;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 12px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Simulate registration success (hook up to real API later)
    console.log("Registered user:", form);
    navigate("/login"); // Redirect to login page
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Register</h2>
      <Input
        type="text"
        placeholder="Full Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        required
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button type="submit">Create Account</Button>
    </StyledForm>
  );
};

export default RegisterForm;
