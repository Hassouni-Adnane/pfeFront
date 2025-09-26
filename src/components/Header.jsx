import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import SignNowToken from "../auth/SignNowToken";

/* Thème minimal */
const RED  = "#D71A28";
const INK  = "#111827";
const GRAY = "#6b7280"; 

/* Barre globale */
const HeaderBar = styled.header`
  height: 64px;
  background: #ffffffcc;
  backdrop-filter: blur(4px);
  border-bottom: 1px solid #eef2f7;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 18px;
  position: sticky;
  top: 0;
  z-index: 20;
`;

/* Logo + marque (le logo est un bouton Home) */
const BrandButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 180px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;

  img {
    height: 100px;               /* ← un peu plus grand */
    display: block;
  }

  /* “Digital Signature” plus petit et stylé */
  span {
  font-weight: 900;
  font-size: 16px;
  letter-spacing: .3px;
  line-height: 1;
  /* rouge → gris */
  background: linear-gradient(90deg, ${RED}, ${GRAY});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;     /* fallback: si besoin, tu peux mettre color: ${RED}; */
}

`;

/* Wrap central pour SignNowToken */
const TokenWrap = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  min-width: 280px;

  .token-bar {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff; border: 1px solid #eef2f7; border-radius: 12px;
    padding: 8px; box-shadow: 0 4px 14px rgba(16,24,40,.06);
  }
  .token-bar input {
    width: 190px; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 8px;
    font-size: 13px; outline: none; transition: box-shadow .2s, border-color .2s;
  }
  .token-bar input:focus { border-color: ${RED}; box-shadow: 0 0 0 4px rgba(215,26,40,.12); }
  .token-bar button {
    padding: 9px 12px; border: 0; border-radius: 10px; background: ${RED};
    color: #fff; font-weight: 700; cursor: pointer; transition: background .15s, transform .04s;
  }
  .token-bar button:hover { background: #b91622; }
  .token-bar button:active { transform: translateY(1px); }

  @media (max-width: 980px) {
    justify-content: flex-start;
    .token-bar { display: none; }
  }
`;

/* Chip utilisateur + logout, avec nom stylé */
const UserChip = styled.div`
  display: inline-flex; align-items: center; gap: 10px;
  background: #f3f4f6; padding: 6px 10px; border-radius: 999px;
  color: ${INK};
`;

const UserName = styled.span`
  font-weight: 800;          /* plus marqué */
  letter-spacing: .3px;      /* look plus “soigné” */
  font-size: 14px;
`;

const Avatar = styled.div`
  width: 28px; height: 28px; border-radius: 999px; background: #fee2e2; color: ${RED};
  display: grid; place-items: center; font-weight: 800; font-size: 12px;
  box-shadow: 0 0 0 6px rgba(215,26,40,.1);
`;

const LogoutBtn = styled.button`
  margin-left: 4px; padding: 8px 10px; border: 0; border-radius: 10px;
  background: ${RED}; color:#fff; font-weight: 700; cursor: pointer;
  transition: background .15s ease, transform .04s ease;
  &:hover{ background:#b91622; } 
  &:active{ transform: translateY(1px); }
`;

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const initials = (user?.name || user?.email || "U")
    .split(" ").map(s => s[0]?.toUpperCase()).slice(0,2).join("");

  const onLogout = () => {
    logout?.();
    navigate("/login");
  };

  const goHome = () => navigate("/");

  return (
    <HeaderBar>
      {/* Logo Redal cliquable + titre “Digital Signature” */}
      <BrandButton onClick={goHome} aria-label="Go to Home">
        <img src="/redal.png" alt="Redal" />
        <span>Digital Signature</span>
      </BrandButton>

      {/* Barre SignNow */}
      <TokenWrap>
        <div className="token-bar">
          <SignNowToken />
        </div>
      </TokenWrap>

      {/* Utilisateur */}
      <UserChip title={user?.email || ""}>
        <Avatar>{initials}</Avatar>
        <UserName>{user?.name || user?.email || "Guest"}</UserName>
        <LogoutBtn onClick={onLogout}>Logout</LogoutBtn>
      </UserChip>
    </HeaderBar>
  );
}
