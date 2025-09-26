// components/AppShell.jsx
import React from "react";
import styled from "styled-components";
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";          // ← crée components/Footer.jsx (ou supprime cette ligne si tu ne l'utilises pas)
import { Outlet } from "react-router-dom";

const BG = "#F5F7FA";

const Shell = styled.div`
  min-height: 100vh;
  background: ${BG};
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 260px 1fr;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "content"
      "footer";
  }
`;

const HeaderWrap = styled.header`
  grid-area: header;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const SidebarWrap = styled.aside`
  grid-area: sidebar;
  background: #ffffff;
  border-right: 1px solid #eef2f7;
  width: 260px;
  min-width: 260px;

  /* Sidebar collée sous le header, scrollable indépendamment */
  position: sticky;
  top: 60px; /* hauteur du header */
  height: calc(100vh - 60px);
  overflow: auto;

  @media (max-width: 960px) {
    display: none;
  }
`;

const Content = styled.main`
  grid-area: content;
  padding: 18px;
  min-width: 0;        /* important pour éviter l’overflow en grid */
`;

const ContentCard = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 26px rgba(16, 24, 40, 0.08);
  padding: 18px;
  min-height: 100%;
`;

const FooterWrap = styled.footer`
  grid-area: footer;
`;

export default function AppShell() {
  return (
    <Shell>
      <HeaderWrap>
        <Header />
      </HeaderWrap>

      <SidebarWrap>
        <SideBar />
      </SidebarWrap>

      <Content>
        {/* Si une page gère déjà sa propre carte, remplace <ContentCard> par <> */}
        <ContentCard>
          <Outlet />
        </ContentCard>
      </Content>

      <FooterWrap>
        <Footer />
      </FooterWrap>
    </Shell>
  );
}
