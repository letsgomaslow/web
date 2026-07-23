# Maslow AI Website

Next.js 15 (App Router) marketing site for Maslow AI. Deployed on Vercel.

## Getting started

```bash
npm install
cp .env.example .env.local
# Add your Resend API key to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable            | Purpose                                                    |
| ------------------- | ---------------------------------------------------------- |
| `RESEND_API_KEY`    | Resend API key for contact/newsletter/book forms           |
| `CONTACT_TO_EMAIL`  | Destination inbox (default `rakesh@maslow.ai`)             |
| `RESEND_FROM_EMAIL` | Verified sender (e.g. `Maslow AI <onboarding@resend.dev>`) |

Set the same values in the Vercel project → Settings → Environment Variables.

## Deploy on Vercel

1. Import this repo in Vercel (Framework Preset: **Next.js**).
2. Add the env vars above.
3. Deploy. Production URL will serve all App Router pages.

## Project notes

- Original Designer’s Canvas sources are archived under `_archive/dc/` (not part of the build).
- Design System page is intentionally not migrated.
- Forms POST to `/api/contact` and email via Resend.
