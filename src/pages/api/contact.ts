import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.text();
    if (!body) {
      return new Response(
        JSON.stringify({ message: 'Request body is empty.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const { name, phone, email, subject, message } = JSON.parse(body);

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: 'Numele, emailul și mesajul sunt obligatorii.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Subject label mapping
    const subjectLabels: Record<string, string> = {
      'cursuri-adulti': 'Cursuri dans adulți',
      'cursuri-copii': 'Cursuri dans copii',
      'dansul-mirilor': 'Dansul mirilor',
      'orar-tarife': 'Orar și tarife',
      'altele': 'Altele',
    };

    const subjectText = subjectLabels[subject] || subject || 'Fără subiect';

    // Configure SMTP transport
    const transporter = nodemailer.createTransport({
      host: import.meta.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(import.meta.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"BloomArt Website" <${import.meta.env.SMTP_USER}>`,
      to: import.meta.env.CONTACT_EMAIL || 'webmaster@cognisearch.net',
      replyTo: email,
      subject: `[BloomArt Contact] ${subjectText} — ${name}`,
      text: [
        `Nume: ${name}`,
        `Email: ${email}`,
        phone ? `Telefon: ${phone}` : '',
        `Subiect: ${subjectText}`,
        '',
        'Mesaj:',
        message,
      ].filter(Boolean).join('\n'),
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #333;">Mesaj nou de pe bloomart.ro</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Nume:</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Telefon:</td><td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td></tr>` : ''}
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Subiect:</td><td style="padding: 8px 0;">${subjectText}</td></tr>
          </table>
          <hr style="margin: 16px 0; border: none; border-top: 1px solid #eee;" />
          <div style="white-space: pre-wrap; color: #333; line-height: 1.6;">${message}</div>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({ message: 'Email trimis cu succes!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ message: 'Eroare la trimiterea emailului. Încearcă din nou.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
