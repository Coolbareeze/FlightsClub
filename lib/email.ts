import nodemailer from 'nodemailer';
import { SITE } from './constants';

// Sends form-submission notification emails via the SMTP credentials for
// the site's own mailbox (info@flightsclubuk.co.uk, created in Hostinger
// hPanel > Emails). No third-party service (Resend/SendGrid/etc.) needed —
// see .env.example for the exact env vars and where to find them.
declare global {
  // eslint-disable-next-line no-var
  var __fcukMailer: ReturnType<typeof nodemailer.createTransport> | undefined;
}

function getTransport() {
  if (!global.__fcukMailer) {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_SECURE } = process.env;
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
      throw new Error(
        'Missing email environment variables (SMTP_HOST, SMTP_USER, SMTP_PASSWORD). ' +
          'See .env.example — these are the SMTP credentials for the info@flightsclubuk.co.uk mailbox.'
      );
    }
    global.__fcukMailer = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT ? Number(SMTP_PORT) : 465,
      secure: SMTP_SECURE ? SMTP_SECURE === 'true' : true,
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    });
  }
  return global.__fcukMailer;
}

interface NotifyInput {
  subject: string;
  html: string;
  replyTo?: string;
}

// Sends a notification to the site's own inbox (info@flightsclubuk.co.uk).
// Throws on failure — callers should catch and log rather than let a broken
// mailbox take down the whole form submission for the customer.
export async function sendNotification({ subject, html, replyTo }: NotifyInput) {
  const transport = getTransport();
  await transport.sendMail({
    from: `"${SITE.name} Website" <${SITE.email}>`,
    to: SITE.email,
    replyTo,
    subject,
    html,
  });
}
