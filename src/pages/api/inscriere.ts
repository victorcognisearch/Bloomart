import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

const courseLabels: Record<string, string> = {
  'copii-dans-modern': 'Copii — Dans Modern',
  'copii-street-dance': 'Copii — Street Dance',
  'copii-baby-dance': 'Copii — Baby Dance',
  'adulti-dans-societate': 'Adulți — Dans de Societate',
  'adulti-street-dance': 'Adulți — Street Dance',
  'dansul-mirilor': 'Dansul Mirilor',
  'indrumare': 'Am nevoie de îndrumare',
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.text();
    if (!body) {
      return new Response(
        JSON.stringify({ message: 'Request body is empty.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { name, email, phone, course, childName, childAge, message } = JSON.parse(body);

    if (!name || !email || !phone || !course) {
      return new Response(
        JSON.stringify({ message: 'Numele, emailul, telefonul și cursul sunt obligatorii.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const courseText = courseLabels[course] || course;

    const transporter = nodemailer.createTransport({
      host: import.meta.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(import.meta.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"BloomArt Website" <${import.meta.env.SMTP_USER}>`,
      to: import.meta.env.CONTACT_EMAIL || 'webmaster@cognisearch.net',
      replyTo: email,
      subject: `[BloomArt Înscriere] ${courseText} — ${name}`,
      text: [
        `Nume: ${name}`,
        `Email: ${email}`,
        `Telefon: ${phone}`,
        `Curs: ${courseText}`,
        childName ? `Nume copil: ${childName}` : '',
        childAge ? `Vârstă copil: ${childAge}` : '',
        '',
        message ? 'Mesaj:' : '',
        message || '',
      ].filter(Boolean).join('\n'),
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #333;">Înscriere nouă de pe bloomart.ro</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Nume:</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Telefon:</td><td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Curs:</td><td style="padding: 8px 0;">${courseText}</td></tr>
            ${childName ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Nume copil:</td><td style="padding: 8px 0;">${childName}</td></tr>` : ''}
            ${childAge ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Vârstă copil:</td><td style="padding: 8px 0;">${childAge}</td></tr>` : ''}
          </table>
          ${message ? `
            <hr style="margin: 16px 0; border: none; border-top: 1px solid #eee;" />
            <div style="white-space: pre-wrap; color: #333; line-height: 1.6;">${message}</div>
          ` : ''}
        </div>
      `,
    });

    return new Response(
      JSON.stringify({ message: 'Înscriere trimisă cu succes!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Enrollment form error:', error);
    return new Response(
      JSON.stringify({ message: 'Eroare la trimiterea înscrierii. Încearcă din nou.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
