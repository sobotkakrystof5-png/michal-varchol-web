// api/contact.js
// Vercel serverless funkce (Node.js runtime) — zpracovává poptávkový formulář
// z kontaktní sekce webu a odesílá e-mail přes Resend.
//
// Konvence Vercelu: soubor v /api/*.js je automaticky namapovaný na route
// se stejným názvem, tzn. tento soubor odpovídá na POST /api/contact.

const { Resend } = require('resend');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = req.body || {};
  const { name, email, phone, message, consent, companyWebsite } = body;

  // Honeypot pole — pokud je vyplněné, jde o bota. Nesmíme mu to dát najevo,
  // takže odpovíme, jako by vše proběhlo v pořádku, ale e-mail neodesíláme.
  if (typeof companyWebsite === 'string' && companyWebsite.trim() !== '') {
    return res.status(200).json({ ok: true });
  }

  // Server-side validace — klientské validaci se nikdy nevěří.
  if (typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ ok: false, error: 'Vyplňte prosím jméno (alespoň 2 znaky).' });
  }

  if (typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({ ok: false, error: 'Zadejte prosím platnou e-mailovou adresu.' });
  }

  if (typeof message !== 'string' || message.trim().length < 10) {
    return res.status(400).json({ ok: false, error: 'Zpráva je příliš krátká, napište prosím alespoň pár vět (min. 10 znaků).' });
  }

  if (phone !== undefined && phone !== null && phone !== '' && typeof phone !== 'string') {
    return res.status(400).json({ ok: false, error: 'Telefon musí být zadán jako text.' });
  }

  const consentGiven = consent === true || consent === 'true' || consent === 'on';
  if (!consentGiven) {
    return res.status(400).json({ ok: false, error: 'Pro odeslání poptávky je nutné souhlasit se zpracováním osobních údajů.' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ ok: false, error: 'E-mailová služba není nakonfigurovaná. Kontaktujte prosím správce webu.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedPhone = typeof phone === 'string' && phone.trim() !== '' ? phone.trim() : 'neuvedeno';
  const trimmedMessage = message.trim();

  const textContent = [
    'Nová poptávka z webu — Malířské práce Litoměřice',
    '',
    `Jméno: ${trimmedName}`,
    `E-mail: ${trimmedEmail}`,
    `Telefon: ${trimmedPhone}`,
    '',
    'Zpráva:',
    trimmedMessage,
  ].join('\n');

  try {
    await resend.emails.send({
      // onboarding@resend.dev je Resend výchozí neověřená odesílací adresa,
      // funguje bez vlastní ověřené domény. Až bude klient mít vlastní
      // doménu ověřenou v Resendu, tuto adresu je potřeba změnit na
      // adresu z jeho domény (např. poptavky@varchol-malir.cz).
      from: 'Poptávky z webu <onboarding@resend.dev>',
      to: ['mvarchy@gmail.com'],
      reply_to: trimmedEmail,
      subject: `Nová poptávka od ${trimmedName}`,
      text: textContent,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend send failed:', err);
    return res.status(500).json({
      ok: false,
      error: 'Nepodařilo se odeslat zprávu. Zkuste to prosím znovu, nebo napište přímo na mvarchy@gmail.com.',
    });
  }
};
