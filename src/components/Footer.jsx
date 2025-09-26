// components/Footer.jsx
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SIDEBAR_W = "260px"; // garde en phase avec SideBar

const FooterBar = styled.footer.attrs({ role: "contentinfo" })`
  background: #ffffff;
  border-top: 1px solid #eef2f7;

  /* Aligne visuellement avec la sidebar en desktop */
  display: grid;
  grid-template-columns: ${SIDEBAR_W} 1fr;

  @media (max-width: 960px) {
    grid-template-columns: 1fr; /* pas de spacer sur mobile */
  }
`;

const Inner = styled.div`
  grid-column: 2;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #6b7280;
  font-size: 13px;

  @media (max-width: 960px) {
    grid-column: 1; /* repasse sur la seule colonne */
    row-gap: 12px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img { height: 40px; width: auto; }
  strong { color: #111827; font-weight: 700; }
`;

const Nav = styled.nav.attrs({ "aria-label": "Liens de bas de page" })`
  display: flex;
  gap: 16px;

  @media (max-width: 960px) {
    gap: 12px;
    flex-wrap: wrap;
  }
`;

const FooterLink = styled(Link)`
  color: #6b7280;
  text-decoration: none;
  &:hover { color: #111827; text-decoration: underline; }
`;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <FooterBar>
      <Inner>
        <Brand>
          <img src="/redal.png" alt="Redal" loading="lazy" />
          <strong>Digital Signature</strong>
          <span>© {year}</span>
        </Brand>

        <Nav>
          <FooterLink to="/legal">Mentions légales</FooterLink>
          <FooterLink to="/privacy">Confidentialité</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </Nav>
      </Inner>
    </FooterBar>
  );
}
