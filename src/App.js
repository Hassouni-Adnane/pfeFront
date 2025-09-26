// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./auth/ProtectedRoute";
import RequireAdmin from "./auth/RequireAdmin";

import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm";

import AppShell from "./components/AppShell";
import UserTable from "./content/UserTable";
import Documents from "./content/Documents";
import Workflows from "./content/Workflows";

// Pages publiques (crées dans src/pages)
import Legal from "./pages/Legal";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Routes>
      {/* ---------- Pages publiques ---------- */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />

      {/* Footer links publics */}
      <Route path="/legal" element={<Legal />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/contact" element={<Contact />} />

      {/* ---------- Espace protégé (auth requise) ---------- */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        {/* page par défaut quand on arrive sur "/" → documents */}
        <Route index element={<Navigate to="/documents" replace />} />

        {/* pages authentifiées */}
        <Route path="documents" element={<Documents />} />
        <Route path="workflows" element={<Workflows />} />

        {/* /admin protégé par rôle */}
        <Route
          path="admin"
          element={
            <RequireAdmin>
              <UserTable />
            </RequireAdmin>
          }
        />
      </Route>

      {/* ---------- Fallback ---------- */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
