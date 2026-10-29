import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface WelcomeEmailData {
  name: string;
  email: string;
  plan: string;
  magicLink: string;
  qrCodeUrl?: string;
}

export async function sendWelcomeEmail(data: WelcomeEmailData) {
  const msg = {
    to: data.email,
    from: process.env.FROM_EMAIL || 'welcome@intuitv.app',
    subject: `Welcome to IntuiTV - Your ${data.plan} account is ready!`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00D4FF, #0066FF); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #00D4FF; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to IntuiTV!</h1>
              <p>Your ${data.plan} account is ready</p>
            </div>
            <div class="content">
              <p>Hi ${data.name},</p>
              
              <p>Welcome to an AI-powered personalized television platform! 🎉</p>
              
              <p>Here's how to get started:</p>
              
              <h3>📱 Mobile Apps</h3>
              <p>Download IntuiTV on your phone:</p>
              <ul>
                <li><a href="https://apps.apple.com/intuitv">iOS App Store</a></li>
                <li><a href="https://play.google.com/store/apps/intuitv">Google Play Store</a></li>
              </ul>
              ${data.qrCodeUrl ? `<p><img src="${data.qrCodeUrl}" alt="QR Code" width="150" /></p>` : ''}
              
              <h3>📺 Smart TV</h3>
              <p>Search "IntuiTV" in your TV's app store (Samsung, LG, Android TV, Fire TV, Apple TV, Roku)</p>
              
              <h3>💻 Web Browser</h3>
              <p>Watch instantly - no download needed</p>
              <a href="${data.magicLink}" class="button">Launch IntuiTV →</a>
              
              <p><strong>One-Click Login:</strong> Click the button above to automatically log in (link expires in 1 hour)</p>
              
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
              
              <h3>What's Next?</h3>
              <ol>
                <li>Choose your preferred device</li>
                <li>Our AI starts learning your preferences immediately</li>
                <li>Enjoy your personalized channel!</li>
              </ol>
              
              <p>Questions? Reply to this email or visit our <a href="https://www.intuitv.app/help">Help Center</a></p>
              
              <p>Happy watching! 🎬</p>
              <p>The IntuiTV Team</p>
            </div>
            <div class="footer">
              <p>© 2026 Media Stream AI Limited | <a href="https://www.intuitv.app/privacy">Privacy Policy</a> | <a href="https://www.intuitv.app/terms">Terms</a></p>
              <p>UK/EU Sovereign | GDPR Compliant | Powered by MOTHER AI</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  await sgMail.send(msg);
}

// IntuiTV sales / demo enquiries go directly to the MediaStreamAI sales inbox.
export async function sendSalesContactNotification(formData: any) {
  const msg = {
    to: process.env.SALES_EMAIL || 'contact@mediastreamai.com',
    from: process.env.FROM_EMAIL || 'noreply@intuitv.app',
    replyTo: formData.email,
    subject: `IntuiTV ${formData.interest || 'enquiry'} — ${formData.company || formData.name}`,
    html: `
      <h2>New IntuiTV ${formData.interest || 'enquiry'}</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Company:</strong> ${formData.company || 'Not provided'}</p>
      <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
      <p><strong>Interest:</strong> ${formData.interest || 'General'}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message || ''}</p>
      <hr><p>Segment: IntuiTV Customers &middot; Source: ${formData.source || 'intuitv.app'}</p>
    `,
  };

  await sgMail.send(msg);
}

// Enterprise enquiries land in the same MSAI inbox as every other contact on
// the site, rather than a product-specific address nobody watches.
export async function sendEnterpriseContactNotification(formData: any) {
  const msg = {
    to: process.env.SALES_EMAIL || 'contact@mediastreamai.com',
    replyTo: formData.email,
    from: process.env.FROM_EMAIL || 'noreply@intuitv.app',
    subject: `New Enterprise Inquiry from ${formData.company}`,
    html: `
      <h2>New Enterprise Contact Request</h2>
      <p><strong>Company:</strong> ${formData.company}</p>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
      <p><strong>Role:</strong> ${formData.role}</p>
      <p><strong>Company Size:</strong> ${formData.employees || 'Not provided'}</p>
      <p><strong>Solution Interest:</strong> ${formData.solution}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
    `,
  };

  await sgMail.send(msg);
}

interface JobApplicationData {
  name: string;
  email: string;
  phone?: string;
  roleTitle: string;
  roleSlug: string;
  siteLabel: string;
  location?: string;
  availability?: string;
  rightToWork?: string;
  message?: string;
  cv?: { filename: string; contentType: string; base64: string };
}

/** Job applications go to the MSAI recruitment inbox with the CV attached, so
 *  an interview can be arranged straight from the email. `replyTo` is the
 *  candidate, so a reply reaches them without anyone copying an address out. */
export async function sendJobApplication(data: JobApplicationData) {
  const row = (k: string, v?: string) =>
    v ? `<p><strong>${k}:</strong> ${escapeHtml(v)}</p>` : '';

  const msg: Record<string, unknown> = {
    to: process.env.CAREERS_EMAIL || process.env.SALES_EMAIL || 'contact@mediastreamai.com',
    from: process.env.FROM_EMAIL || 'noreply@mediastreamai.com',
    replyTo: data.email,
    subject: `Application: ${data.roleTitle} — ${data.name} (${data.siteLabel})`,
    html: `
      <h2>New application — ${escapeHtml(data.roleTitle)}</h2>
      <p><strong>Site:</strong> ${escapeHtml(data.siteLabel)}</p>
      ${row('Name', data.name)}
      ${row('Email', data.email)}
      ${row('Phone', data.phone)}
      ${row('Based in', data.location)}
      ${row('Availability', data.availability)}
      ${row('Right to work in the UK', data.rightToWork)}
      ${data.message ? `<p><strong>Covering note:</strong></p><p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>` : ''}
      <hr>
      <p>CV: ${data.cv ? escapeHtml(data.cv.filename) + ' (attached)' : 'not attached'}</p>
      <p>Role: <a href="https://www.mediastreamai.com/careers/${encodeURIComponent(data.roleSlug)}">mediastreamai.com/careers/${escapeHtml(data.roleSlug)}</a></p>
      <p>Next step: shortlist and set an interview date with the candidate.</p>
    `,
  };

  if (data.cv) {
    msg.attachments = [{
      content: data.cv.base64,
      filename: data.cv.filename,
      type: data.cv.contentType,
      disposition: 'attachment',
    }];
  }

  await sgMail.send(msg as unknown as Parameters<typeof sgMail.send>[0]);
}

/** Candidate-facing acknowledgement, so an application never disappears into
 *  silence. Best-effort: the application is already captured by the time this
 *  is attempted. */
export async function sendApplicationAcknowledgement(data: JobApplicationData) {
  await sgMail.send({
    to: data.email,
    from: process.env.FROM_EMAIL || 'noreply@mediastreamai.com',
    replyTo: process.env.CAREERS_EMAIL || 'contact@mediastreamai.com',
    subject: `We have your application — ${data.roleTitle}`,
    html: `
      <p>Hi ${escapeHtml(data.name.split(' ')[0] || data.name)},</p>
      <p>Thank you for applying for <strong>${escapeHtml(data.roleTitle)}</strong> at ${escapeHtml(data.siteLabel)}.</p>
      <p>Your application and CV are with our recruitment team. We review every application against the
         role requirements and contact shortlisted candidates to arrange an interview — the interview date
         is set individually with each candidate.</p>
      <p>If you need to add anything, simply reply to this email.</p>
      <p>Media Stream AI Limited<br>
         <a href="https://www.mediastreamai.com/careers">mediastreamai.com/careers</a></p>
    `,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
