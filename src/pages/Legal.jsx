import React from "react";
import styled from "styled-components";

const RED="#D71A28", INK="#111827", GRAY="#6b7280", BG="#F5F7FA", SOFT="#eef2f7";

const Wrap = styled.div`max-width: 980px; margin: 22px auto; padding: 0 18px 28px;`;
const Hero = styled.div`
  background: linear-gradient(180deg, #fff, ${BG});
  border: 1px solid ${SOFT};
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 10px 26px rgba(16,24,40,.06);
`;
const Badge = styled.span`
  font-size: 12px; font-weight: 800; letter-spacing: .14em;
  text-transform: uppercase; color: ${GRAY};
`;
const Title = styled.h1`margin: 6px 0 4px; font-size: 32px; color: ${INK}; font-weight: 900;`;
const Underline = styled.div`width: 72px; height: 3px; border-radius: 999px; background: linear-gradient(90deg, ${RED}, #9ca3af); margin: 8px 0 4px;`;
const Updated = styled.div`color: ${GRAY}; font-size: 13px;`;

const Card = styled.article`
  background:#fff; border:1px solid ${SOFT}; border-radius:16px; padding:18px 20px;
  box-shadow:0 8px 20px rgba(16,24,40,.06); margin-top: 16px;
`;
const H2 = styled.h2`margin: 8px 0 8px; color:${INK}; font-size: 20px; font-weight: 800;`;
const H3 = styled.h3`margin: 8px 0 8px; color:${INK}; font-size: 17px; font-weight: 800;`;
const P  = styled.p`margin: 8px 0; color:${INK}; line-height: 1.7;`;
const List = styled.ul`padding-left: 20px; margin: 8px 0; color:${INK};`;
const Li  = styled.li`margin: 6px 0;`;
const Small = styled.p`margin: 8px 0; color:${GRAY}; font-size: 13px;`;

export default function Legal() {
  const today = new Date().toLocaleDateString("fr-FR", { day:"2-digit", month:"2-digit", year:"numeric" });

  return (
    <Wrap>
      <Hero>
        <Badge>Mentions légales</Badge>
        <Title>Mentions légales</Title>
        <Underline />
        <Updated>Dernière mise à jour : {today}</Updated>
      </Hero>

      <Card>
        <H2>1. Identité</H2>
        <P><strong>Dénomination sociale de l&apos;éditeur&nbsp;:</strong> Veolia MAROC</P>
        <P><strong>Statut société&nbsp;:</strong> SA</P>
        <P><strong>RC&nbsp;:</strong> N° 58 711</P>
        <P><strong>Siège social&nbsp;:</strong> 19, Avenue Ibn Sina – Agdal – Rabat</P>
      </Card>

      <Card>
        <H2>2. Règles professionnelles</H2>
        <P>Veolia Maroc, à travers sa filiale Redal, est une société de droit marocain soumise au droit marocain.</P>
      </Card>

      <Card>
        <H2>3. Déclaration</H2>
        <P>
          Les données à caractère personnel recueillies dans le cadre de ce site font l’objet d’une déclaration à la
          Commission Nationale de Contrôle des Données à caractère Personnel (CNDP), en application de la loi 09-08 du
          18 février 2009 relative à la Protection des Personnes Physiques à l&apos;égard du Traitement des Données à
          Caractère Personnel. Les utilisateurs peuvent obtenir à cet effet les renseignements nécessaires auprès de cet organisme.
        </P>
      </Card>

      <Card>
        <H2>4. Réservation du nom de domaine</H2>
        <P>
          <a href="https://www.redal.ma" target="_blank" rel="noreferrer">www.redal.ma</a> et
          {" "}
          <a href="https://www.redalclient.ma" target="_blank" rel="noreferrer">www.redalclient.ma</a>
          {" "}
          sont des domaines déposés par Veolia Maroc auprès de l’OMPIC.
        </P>
      </Card>

      <Card>
        <H2>5. Avertissement aux utilisateurs</H2>
        <P>L’utilisateur déclare accepter les caractéristiques et les limites d’Internet et en particulier, reconnaître :</P>
        <List>
          <Li>Avoir connaissance de la nature du réseau Internet, de ses performances techniques et des temps de réponse ;</Li>
          <Li>Que les données circulant sur Internet ne sont pas nécessairement protégées contre d’éventuels détournements ;</Li>
          <Li>Que la communication à des tiers de ses identifiants et de toute information personnelle se fait à ses risques et périls ;</Li>
          <Li>Qu’il lui appartient de protéger ses propres données et/ou logiciels contre les virus ;</Li>
          <Li>Et être informé des règles de conduite (de droit et d’équité) à adopter en ligne.</Li>
        </List>
      </Card>

      <Card>
        <H2>6. Conditions générales</H2>

        <H3>6-1. Conditions d’accès et d’utilisation</H3>
        <P>
          Les sites <strong>www.redal.ma</strong> et <strong>www.redalclient.ma</strong> ont pour objet de fournir des
          informations sur l’activité métier et clientèle de Redal, et de permettre aux personnes physiques titulaires
          d’un compte d’accéder à un espace privé. Ces sites sont soumis à la loi marocaine.
        </P>
        <P>
          L’utilisateur reconnaît disposer des compétences et moyens nécessaires pour accéder et utiliser ces sites,
          avoir pris connaissance de la présente notice légale et s’engager à la respecter. Les sites sont fournis
          « en l’état », accessibles 24/7 (sauf force majeure ou maintenance). Pour maintenance, Veolia peut interrompre
          l’accès et s’efforcera d’en avertir préalablement les utilisateurs. Veolia Maroc ne saurait être tenue
          responsable d’une impossibilité d’accès.
        </P>
        <P>
          Veolia Maroc se réserve le droit de refuser l’accès à tout internaute, unilatéralement et sans préavis, en
          cas de violation des règles de navigation. L’accès aux zones protégées par mot de passe est limité aux
          utilisateurs autorisés. Toute tentative d’accès non autorisé peut faire l’objet de poursuites.
        </P>
        <P>
          L’accès aux produits et services décrits peut faire l’objet de restrictions selon les personnes ou pays.
          Aucun produit/service ne peut être fourni si la loi applicable l’interdit. L’utilisateur doit vérifier qu’il
          est juridiquement autorisé à se connecter depuis le pays d’où il se connecte.
        </P>

        <H3>6-2. Services mis à disposition sur l’Espace Client</H3>
        <P>
          En créant votre espace client, vos données seront utilisées pour vous permettre de régler vos factures,
          formuler une réclamation ou une demande, et consulter l’historique de vos factures et relevés de consommation.
        </P>

        <H3>6-3. Politique de liens hypertextes</H3>
        <P>
          Les liens hypertextes vers des ressources externes (partenaires, etc.) ont reçu une autorisation préalable.
          Les informations publiées proviennent de sources jugées fiables. L’existence d’un lien ne constitue pas une
          validation du site tiers ; l’utilisateur en fait usage sous sa responsabilité.
        </P>
        <P>
          Veolia Maroc décline toute responsabilité pour dommages/pertes en lien avec l’utilisation de contenus, biens
          ou services disponibles sur des sites ou sources externes. La confidentialité et l’intégrité des informations
          n’étant pas assurées sur Internet, les messages électroniques peuvent être interceptés et/ou modifiés.
        </P>
        <P>
          Les utilisateurs ne peuvent mettre en place un lien vers le site sans autorisation écrite préalable de
          Veolia Maroc.
        </P>
      </Card>

      <Card>
        <H2>7. Droit d’accès, de modification et d’opposition</H2>
        <P>
          Les informations recueillies sur <strong>www.redal.ma</strong> et <strong>www.redalclient.ma</strong> font
          l’objet d’un traitement informatique aux seules fins de gestion des demandes, dossiers d’abonnement et
          informations y afférentes. Les destinataires des données sont les Directions Métiers de Redal.
        </P>
        <P>
          Conformément à la loi n°09-08, vous disposez d’un droit à l’information, de rectification et d’opposition.
          Pour l’exercer&nbsp;:
        </P>
        <List>
          <Li><strong>Entité :</strong> Direction de la Communication Redal</Li>
          <Li><strong>Tél :</strong> 05 37 238 289</Li>
          <Li><strong>E-mail :</strong> <a href="mailto:Redalclient@veoliaservice.ma">Redalclient@veoliaservice.ma</a></Li>
          <Li>Traitement autorisé par la CNDP sous le N° : A-04/2016</Li>
        </List>
      </Card>

      <Card>
        <H2>8. Protection des données à caractère personnel</H2>
        <P>
          Les utilisateurs sont tenus de respecter la loi 09-08 du 18 février 2009. Ils doivent s’abstenir de toute
          collecte ou utilisation abusive d’informations ainsi que de tout acte portant atteinte à la vie privée.
        </P>
        <P>
          Dans certains cas, des informations personnelles (nom, prénom, coordonnées, e-mail) peuvent être demandées.
          Ces informations sont susceptibles de traitements automatisés, recueillies conformément à l’article 5 de la
          loi 09-08, destinées au seul usage de Veolia Maroc, de ses filiales et partenaires le cas échéant, et ne
          sont pas mises à la disposition de tiers. Les coordonnées ne sont utilisées que pour informer et n’adresser
          que les informations souhaitées.
        </P>
      </Card>

      <Card>
        <H2>9. Propriété intellectuelle</H2>
        <P>
          L’ensemble des données (textes, sons, images) et bases de données figurant sur ce site est la propriété
          exclusive de Veolia Maroc. Toute reproduction, représentation, diffusion ou extraction, même partielle, par
          quelque procédé que ce soit est interdite. Les marques et logos de Veolia Maroc sont déposés ; toute
          reproduction totale ou partielle à des fins quelconques sans accord écrit préalable est interdite (articles
          154 et 155 de la loi 17-97, modifiée par la loi 31-05).
        </P>
      </Card>

      <Card>
        <H2>10. Cookies</H2>
        <P>
          Lors des visites, un cookie peut s’installer automatiquement et être temporairement conservé. Il enregistre
          des informations relatives à la navigation, sans identifier l’utilisateur. Ces cookies servent à optimiser
          la sécurité du site et fournir un service optimal, notamment pour&nbsp;:
        </P>
        <List>
          <Li>Gérer les paramètres personnels à la connexion à l’espace sécurisé ;</Li>
          <Li>Orienter la navigation vers les contenus adaptés ;</Li>
          <Li>Stocker temporairement des informations entrées ;</Li>
          <Li>Mesurer la fréquentation et l’efficacité des campagnes internes.</Li>
        </List>
        <P>
          L’utilisateur peut désactiver les cookies via les paramètres de son navigateur. En cas de refus, l’accès à
          certains services peut être altéré, voire impossible.
        </P>
        <Small>En aucun cas, les cookies n’ont pour objet d’exploiter des informations nominatives.</Small>
      </Card>

      <Card>
        <H2>11. Tarification</H2>
        <P>
          L’accès au site est gratuit (hors coût du fournisseur d’accès à Internet et des communications
          téléphoniques facturés par les opérateurs).
        </P>
      </Card>

      <Card>
        <H2>12. Compétence juridictionnelle et loi applicable</H2>
        <P>
          Tout litige relatif à l’interprétation ou l’exécution des présentes relève de la compétence exclusive du
          Tribunal de Commerce de Rabat. La loi marocaine est applicable au fond et à la procédure.
        </P>
      </Card>
    </Wrap>
  );
}
