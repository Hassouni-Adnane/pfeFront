import React from "react";
import styled from "styled-components";

const RED="#D71A28", INK="#111827", GRAY="#6b7280", BG="#F5F7FA", SOFT="#eef2f7";

const Wrap = styled.div`max-width: 980px; margin: 22px auto; padding: 0 18px 28px;`;
const Hero = styled.div`
  background: linear-gradient(180deg, #fff, ${BG});
  border: 1px solid ${SOFT}; border-radius: 18px;
  padding: 22px; box-shadow: 0 10px 26px rgba(16,24,40,.06);
`;
const Badge = styled.span`font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:${GRAY};`;
const Title = styled.h1`margin:6px 0 4px;font-size:32px;color:${INK};font-weight:900;`;
const Underline = styled.div`width:72px;height:3px;border-radius:999px;background:linear-gradient(90deg,${RED},#9ca3af);margin:8px 0 4px;`;
const Sub = styled.p`margin:0;color:${GRAY};font-size:14px;`;
const Card = styled.article`
  background:#fff;border:1px solid ${SOFT};border-radius:16px;padding:18px 20px;
  box-shadow:0 8px 20px rgba(16,24,40,.06); margin-top:16px;
`;
const H3 = styled.h3`margin:0 0 10px;font-size:18px;color:${INK};font-weight:800;`;
const P = styled.p`margin:8px 0;color:${INK};line-height:1.65;`;
const Ul = styled.ul`margin:6px 0 0 18px;color:${INK};line-height:1.6;`;

export default function Privacy() {
  const last = new Date().toLocaleDateString("fr-FR");
  return (
    <Wrap>
      <Hero>
        <Badge>Confidentialité</Badge>
        <Title>Politique de confidentialité</Title>
        <Underline />
        <Sub>Dernière mise à jour&nbsp;: {last}</Sub>
      </Hero>

      <Card>
        <H3>1. Données collectées</H3>
        <P>Nous collectons uniquement les données nécessaires au fonctionnement du service&nbsp;:</P>
        <Ul>
          <li>Identité (nom, email, rôle)</li>
          <li>Données d’audit (dates d’accès, actions effectuées)</li>
          <li>Fichiers/tampons de signature que vous téléversez</li>
        </Ul>
      </Card>

      <Card>
        <H3>2. Finalités</H3>
        <Ul>
          <li>Fournir la signature et la gestion des documents</li>
          <li>Assurer la sécurité et la traçabilité</li>
          <li>Améliorer l’expérience et le support</li>
        </Ul>
      </Card>

      <Card>
        <H3>3. Durées de conservation</H3>
        <P>Les données sont conservées pour la durée nécessaire aux finalités décrites, puis supprimées ou anonymisées.</P>
      </Card>

      <Card>
        <H3>4. Partage</H3>
        <P>Nous ne vendons pas vos données. Elles peuvent être partagées avec des sous-traitants (hébergement, emailing) contractuellement engagés à respecter la confidentialité.</P>
      </Card>

      <Card>
        <H3>5. Vos droits</H3>
        <Ul>
          <li>Accès, rectification, effacement</li>
          <li>Opposition et limitation du traitement</li>
          <li>Portabilité</li>
        </Ul>
        <P>Pour exercer vos droits&nbsp;: <a href="mailto:support@votredomaine.com">support@votredomaine.com</a></P>
      </Card>

      <Card>
        <H3>6. Cookies</H3>
        <P>Des cookies techniques sont utilisés pour la session. Vous pouvez configurer votre navigateur pour les limiter.</P>
      </Card>
    </Wrap>
  );
}
