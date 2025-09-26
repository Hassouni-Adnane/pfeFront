import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import AdminLoginModal from "../auth/AdminLoginModal";

/* Palette */
const INK  = "#111827";
const GRAY = "#6b7280";

/* Layout */
const Aside = styled.aside`
  height: 100%;
  padding: 16px 14px;
  background: transparent;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 11px;
  font-weight: 900;
  color: ${GRAY};
  letter-spacing: .14em;
  text-transform: uppercase;
  margin: 6px 6px 12px;
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Spacer = styled.div`
  flex: 1;
`;

/* Items compacts “comme avant” */
const itemBase = `
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 10px 14px;
  border-radius: 12px;
  text-decoration: none;
  border: 1px solid #eef2f7;
  background: #ffffff;
  box-shadow: 0 6px 14px rgba(16,24,40,.05);
  transition: transform .08s ease, box-shadow .15s ease, border-color .2s ease, background .2s ease;

  font-weight: 800;
  letter-spacing: .2px;
  color: ${INK};
  font-size: 14px;

  &:hover {
    transform: translateX(2px);
    box-shadow: 0 10px 18px rgba(16,24,40,.08);
    border-color: #e5e7eb;
    background: #fbfbfb;
  }

  &.active {
    background: #f9fafb;
    border-color: #e5e7eb;
  }
`;

const ButtonItem = styled(NavLink)`
  ${itemBase}
`;

const AdminButton = styled.button`
  ${itemBase}
  cursor: pointer;

  background: #ffe9ec;
  border-color: #f3c7cd;
  box-shadow: 0 8px 18px rgba(215, 26, 40, .10);

  &:hover {
    background: #ffeef0;
    box-shadow: 0 12px 24px rgba(215, 26, 40, .14);
  }

  &.active {
    background: #ffe3e6;
    border-color: #e9a7ae;
  }
`;

export default function SideBar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showAdminModal, setShowAdminModal] = useState(false);
  const isAdminActive = location.pathname.startsWith("/admin");

  const onAdminClick = () => {
    if (user?.role === "admin") navigate("/admin");
    else setShowAdminModal(true);
  };

  return (
    <Aside>
      <Title>Navigation</Title>

      <Stack>
        <ButtonItem to="/documents">Documents</ButtonItem>
        <ButtonItem to="/workflows">Workflows</ButtonItem>
        <ButtonItem to="/library">Library</ButtonItem>
      </Stack>

      <Spacer />

      <AdminButton
        type="button"
        onClick={onAdminClick}
        className={isAdminActive ? "active" : undefined}
      >
        Admin
      </AdminButton>

      {showAdminModal && (
        <AdminLoginModal onClose={() => setShowAdminModal(false)} />
      )}
    </Aside>
  );
}
