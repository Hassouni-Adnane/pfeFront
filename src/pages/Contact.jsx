import React, { useState } from "react";
import styled from "styled-components";

const RED="#D71A28", INK="#111827", GRAY="#6b7280", BG="#F5F7FA", SOFT="#eef2f7";
const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

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

/* 👉 grille avec une colonne fixe max 560px pour le formulaire */
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(360px, 560px);
  gap: 16px;
  margin-top: 16px;
  @media (max-width: 1100px){ grid-template-columns: 1fr; }
`;

const Card = styled.div`
  background:#fff;border:1px solid ${SOFT};border-radius:16px;padding:18px 20px;
  box-shadow:0 8px 20px rgba(16,24,40,.06);
`;
/* 👉 FormCard pour garantir une largeur max ET rester dans la carte */
const FormCard = styled(Card)`
  max-width: 560px;
  width: 100%;
  box-sizing: border-box;
  margin-left: auto; /* colle à droite quand il y a 2 colonnes */
`;

const H3 = styled.h3`margin:0 0 10px;font-size:18px;color:${INK};font-weight:800;`;
const P = styled.p`margin:8px 0;color:${INK};line-height:1.65;`;

const Field = styled.label`
  display:block;margin:10px 0 0;
  span{display:block;margin-bottom:6px;font-size:13px;font-weight:700;color:${INK};}
  input,textarea{
    width:100%;
    max-width:100%;
    padding:12px 14px;
    border:1px solid #d1d5db;
    border-radius:10px;
    outline:none;
    transition:box-shadow .2s,border-color .2s,background .2s;
    background:#fff;
    font-size:14px;
    box-sizing: border-box; /* ✅ évite tout dépassement */
  }
  input:focus,textarea:focus{border-color:${RED};box-shadow:0 0 0 4px rgba(215,26,40,.12);}
  textarea{min-height:120px;resize:vertical;}
`;
const Row = styled.div`display:flex;gap:10px; margin-top:12px;`;
const Button = styled.button`
  flex:1;padding:12px 14px;border:0;border-radius:10px;font-weight:800;cursor:pointer;
  transition:transform .04s ease, background .15s ease, opacity .15s;
  ${({variant}) => variant==="primary"
    ? `background:${RED};color:#fff;&:hover{background:#b91622;}`
    : `background:#e5e7eb;color:#111827;&:hover{background:#d1d5db;}`
  }
  &:active{transform:translateY(1px);}
  &:disabled{opacity:.6; cursor:not-allowed;}
`;

const InfoItem = styled.div`
  display:flex;gap:12px;align-items:flex-start;margin:12px 0 0;
  b{color:${INK};}
  span, a{color:${GRAY};text-decoration:none;}
  a:hover{color:${INK};text-decoration:underline;}
`;

const AlertOk = styled.div`
  margin-top:12px; padding:10px 12px; border-radius:8px;
  background:#d1fae5; border:1px solid #a7f3d0; color:#065f46; font-size:14px;
`;
const AlertErr = styled.div`
  margin-top:12px; padding:10px 12px; border-radius:8px;
  background:#fde2e4; border:1px solid #f9c6ca; color:#7a2328; font-size:14px;
`;

export default function Contact() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setOk(false);
    setError("");

    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Envoi impossible");

      setOk(true);
      setForm({ name:"", email:"", subject:"", message:"" });
      // Optionnel : cacher l'alerte après 3s
      setTimeout(() => setOk(false), 3000);
    } catch (err) {
      setError(err.message || "Envoi impossible");
    } finally {
      setSending(false);
    }
  };

  return (
    <Wrap>
      <Hero>
        <Badge>Contact</Badge>
        <Title>Nous contacter</Title>
        <Underline />
        <Sub>Une question ? Un besoin métier ? Envoyez-nous un message.</Sub>
      </Hero>

      <Grid>
        {/* Colonne gauche : coordonnées */}
        <Card>
          <H3>Coordonnées</H3>
          <P>Nous répondons généralement sous 1 jour ouvré.</P>
          <InfoItem>
            <b>Adresse</b>
            <span>6 Rue Al Hoceima, Rabat, Maroc</span>
          </InfoItem>
          <InfoItem>
            <b>Téléphone</b>
            <span>+212 537 20 20 80</span>
          </InfoItem>
          <InfoItem>
            <b>Email</b>
            <a href="mailto:ezan.shop2021@gmail.com">ezan.shop2021@gmail.com</a>
          </InfoItem>
        </Card>

        {/* Colonne droite : formulaire (width max 560px) */}
        <FormCard as="form" onSubmit={onSubmit} noValidate>
          <H3>Écrivez-nous</H3>
          <Field>
            <span>Nom complet</span>
            <input
              type="text"
              name="name"
              required
              placeholder="Votre nom"
              value={form.name}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <span>Email</span>
            <input
              type="email"
              name="email"
              required
              placeholder="vous@exemple.com"
              value={form.email}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <span>Objet</span>
            <input
              type="text"
              name="subject"
              required
              placeholder="Sujet de votre message"
              value={form.subject}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <span>Message</span>
            <textarea
              name="message"
              required
              placeholder="Expliquez votre besoin…"
              value={form.message}
              onChange={handleChange}
            />
          </Field>

          {ok && <AlertOk>✅ Message envoyé. Nous revenons vers vous rapidement.</AlertOk>}
          {error && <AlertErr>{error}</AlertErr>}

          <Row>
            <Button
              type="reset"
              variant="secondary"
              onClick={() => { setForm({ name:"", email:"", subject:"", message:"" }); setError(""); setOk(false); }}
              disabled={sending}
            >
              Annuler
            </Button>
            <Button type="submit" variant="primary" disabled={sending}>
              {sending ? "Envoi…" : "Envoyer"}
            </Button>
          </Row>
        </FormCard>
      </Grid>
    </Wrap>
  );
}
