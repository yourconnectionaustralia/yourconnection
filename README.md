# Your Connection — Cloudflare Pages Deployment

## File Structure

```
yourconnection-deploy/
├── index.html              ← Main website
├── functions/
│   └── api/
│       └── contact.js      ← Cloudflare Pages Function (sends email)
├── images/
│   ├── logo-full.png       ← Hero logo (high-res)
│   ├── logo-nav.jpg        ← Navigation logo
│   └── logo-icon.gif       ← Footer "O" icon / favicon
├── fonts/                  ← YOU MUST ADD THESE
│   ├── Gridular-Regular.woff2
│   ├── Gridular-Regular.woff
│   ├── Gridular-Bold.woff2
│   └── Gridular-Bold.woff
└── README.md               ← This file
```

## Deployment Steps

### 1. Add Gridular Font Files

The Ven Agency logo uses the **Gridular** font. You need to add the font files to the `/fonts/` directory before deploying. The CSS will fall back to DM Sans if the font files aren't present.

### 2. Deploy to Cloudflare Pages

**Option A — Direct Upload (easiest):**
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Workers & Pages** → **Create** → **Pages** → **Upload assets**
3. Name the project (e.g. `yourconnection-com-au`)
4. Drag and drop the entire `yourconnection-deploy` folder contents
5. Deploy

**Option B — Git integration:**
1. Push this folder to a GitHub/GitLab repo
2. In Cloudflare Dashboard → **Workers & Pages** → **Create** → **Connect to Git**
3. Select the repo, set build output to `/` (root)
4. Deploy

### 3. Configure Custom Domain

1. In your Pages project → **Custom domains** → **Set up a custom domain**
2. Enter `yourconnection.com.au` (and `www.yourconnection.com.au`)
3. Cloudflare will provide DNS records to add
4. If your domain is already on Cloudflare DNS, it auto-configures

### 4. Set Up Email Sending (MailChannels)

The contact form uses **MailChannels** to send emails to `info@yourconnection.com.au`. MailChannels is free for Cloudflare Workers/Pages Functions.

**DNS record required** — add this TXT record to `yourconnection.com.au`:

```
Type:  TXT
Name:  _mailchannels
Value: v=mc1 cfid=yourconnection-com-au.pages.dev
```

Replace `yourconnection-com-au.pages.dev` with your actual Cloudflare Pages project URL.

**Also recommended** — SPF record to authorise MailChannels:

```
Type:  TXT
Name:  @
Value: v=spf1 include:relay.mailchannels.net ~all
```

> **NOTE:** If MailChannels is unavailable or the DNS isn't configured yet, the form will automatically fall back to opening the user's email client with a pre-filled mailto: link to info@yourconnection.com.au.

### 5. Alternative: Use Cloudflare Email Workers

If you prefer not to use MailChannels, you can:
- Use **Cloudflare Email Routing** with **Email Workers** to forward form data
- Replace the MailChannels API call in `functions/api/contact.js` with a different provider (SendGrid, Resend, etc.)
- Use a third-party form service like Formspree or Basin

## Form Behaviour

1. User fills in the form and clicks "Send Enquiry"
2. JavaScript sends a POST request to `/api/contact`
3. The Cloudflare Pages Function sends an email to `info@yourconnection.com.au`
4. On success: a confirmation message is shown
5. On failure: falls back to `mailto:info@yourconnection.com.au` with pre-filled data

## What's Included

- **Responsive design** — works on desktop, tablet, and mobile
- **Scroll animations** — elements reveal on scroll
- **All logos** — YourConnection nav, hero, and footer logos
- **Ven Agency intro** — with Gridular font logo and description
- **6 service cards** — each linking to the relevant ven.com.au service page
- **Contact form** — sends enquiries to info@yourconnection.com.au
- **SEO basics** — proper title, meta viewport, semantic HTML
