# Jimtoz Bakery — Full MERN Website

A complete MERN (MongoDB, Express, React, Node) website for Jimtoz Bakery, styled in
mustard yellow and chocolate brown, with an elegant Fraunces/Manrope font pairing,
rounded "soft bakery" UI, scroll-reveal animations throughout, and a custom
pastry-crimp divider as the site's signature visual motif.

## What's included

**Customer-facing**
- Home page with hero, featured products, story teaser, testimonials
- Full menu with category filters (bread, pastries, cakes, cookies)
- Custom cake order form (flavor, size, tiers, occasion, reference image upload, date needed)
- Shopping basket with pickup/delivery scheduling and payment method selection
- Guest checkout or account sign-in
- Order tracking page with a visual status timeline
- Loyalty points (1 point per KES 100 spent, stored per account)
- Customer reviews/testimonials (submitted reviews are held for admin approval)
- Newsletter signup (footer)
- About / "Meet the Baker" story page
- Contact page

**Admin**
- `/admin` dashboard (only visible to accounts with role `admin`) to:
  - View all orders and update their status (received → confirmed → baking → ready → completed)
  - Add/remove menu products
  - Approve customer reviews before they go live

**Technical**
- Scroll-triggered fade-up animations on every page (via Framer Motion + Intersection Observer)
- Fully responsive, mobile-first layout
- JWT authentication, hashed passwords
- Clean component structure, reusable Button/Card/Placeholder components

## What's stubbed for you to finish later

These need real-world accounts/services that only you can set up, so they're wired
with clear `// TODO` comments in the code instead of guessed at:
- **Image uploads** — the custom cake form and admin product form currently only
  reference a file name. Connect a real image host (Cloudinary, AWS S3, or
  Firebase Storage) and save the returned URL.
- **M-Pesa / card payments** — the checkout captures a payment method but does not
  process real payments yet. Integrate the M-Pesa Daraja API and/or Stripe.
- **Contact form email delivery** — currently shows a success message but doesn't
  send an email. Wire it to a service like Resend, SendGrid, or Nodemailer.
- **Instagram feed** — footer has placeholder tiles; swap for the Instagram Basic
  Display API or an embed widget once you have a Business account.
- **Logo** — see "Adding your logo" below.
- **Photos** — every image slot uses a dashed placeholder with a label describing
  what should go there, so you know exactly what to shoot/upload.

---

## 1. Prerequisites

Install these once on your machine:
- **Node.js** (v18 or later) — https://nodejs.org
- **MongoDB** — either install locally (https://www.mongodb.com/try/download/community)
  or create a free cloud database at https://www.mongodb.com/cloud/atlas (recommended
  for beginners — no local install needed)
- A code editor (VS Code recommended)

Check Node is installed:
```bash
node -v
npm -v
```

## 2. Project structure

```
jimtoz/
├── backend/     ← Express + MongoDB API
└── frontend/    ← React + Vite + Tailwind site
```

## 3. Backend setup

```bash
cd backend
npm install
```

This installs: `express`, `mongoose`, `cors`, `dotenv`, `bcryptjs`, `jsonwebtoken`,
`morgan`, `express-async-handler`, and `nodemon` (dev only).

Create your environment file:
```bash
cp .env.example .env
```

Open `.env` and fill in:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/jimtoz
JWT_SECRET=replace_this_with_a_long_random_string
CLIENT_URL=http://localhost:5173
```
- If using MongoDB Atlas, replace `MONGO_URI` with the connection string Atlas gives
  you (Database → Connect → Drivers).
- `JWT_SECRET` can be any long random string — e.g. run `openssl rand -hex 32` in your
  terminal and paste the result.

Seed the database with an admin account and a few sample products:
```bash
npm run seed
```
This prints an admin login (`admin@jimtoz.com` / `ChangeMe123`) — **sign in and change
that password by registering a proper admin account, then update the `role` field to
`"admin"` directly in your database** (or re-run the seed script after editing `seed.js`).

Start the backend:
```bash
npm run dev
```
You should see `Jimtoz server running on port 5000` and `MongoDB connected: ...`.

## 4. Frontend setup

Open a **second terminal** (keep the backend running in the first one):
```bash
cd frontend
npm install
```

This installs: `react`, `react-dom`, `react-router-dom`, `axios`, `framer-motion`,
`react-intersection-observer`, `react-hot-toast`, `lucide-react`, plus `tailwindcss`,
`postcss`, `autoprefixer`, and `vite` (dev tooling).

Create your environment file:
```bash
cp .env.example .env
```
Leave it as `VITE_API_URL=http://localhost:5000/api` unless you deploy the backend
somewhere else later.

Start the frontend:
```bash
npm run dev
```
Open the URL it prints — typically **http://localhost:5173**.

## 5. Adding your logo

The navbar and footer currently show a dashed circular placeholder labeled "LOGO".
To add your real logo:
1. Save your logo file as `frontend/public/logo.png` (also update `favicon.png` while
   you're there — that's your browser-tab icon).
2. Open `frontend/src/components/Logo.jsx` and replace the placeholder `<div>` with:
   ```jsx
   <img src="/logo.png" alt="Jimtoz Bakery" className="h-10 w-auto" />
   ```

## 6. Adding real photos

Every image on the site uses the `ImagePlaceholder` component
(`frontend/src/components/ImagePlaceholder.jsx`), which shows a dashed box with a
label describing what belongs there — e.g. "Hero photo — fresh bakes on a rustic
table". Once you have a photo:
- Drop it into `frontend/public/images/` (create that folder), e.g. `hero.jpg`
- Pass it as `src="/images/hero.jpg"` to that `ImagePlaceholder` — it will
  automatically render the real photo instead of the placeholder, keeping the same
  sizing and rounded corners.

Product photos work the same way — just add an `image` field (a URL or `/images/...`
path) when creating a product from the admin dashboard.

## 7. Making yourself an admin

The fastest way, without any extra tooling:
1. Register a normal account on the site (`/register`).
2. Open your database (MongoDB Compass, or Atlas's web UI) and find your user
   document in the `users` collection.
3. Change its `role` field from `"customer"` to `"admin"`.
4. Log out and back in — you'll now see `/admin` is accessible.

## 8. Deployment notes (when you're ready)

- **Backend**: deploy to Render, Railway, or a VPS. Set the same environment
  variables from `.env` in your hosting provider's dashboard.
- **Frontend**: deploy to Vercel or Netlify. Set `VITE_API_URL` to your live
  backend URL (e.g. `https://api.jimtoz.com/api`).
- Update `CLIENT_URL` in the backend `.env` to your live frontend URL so CORS
  allows it.

---

## Troubleshooting

- **"MongoDB connection error"** — check `MONGO_URI` in `backend/.env`. If using
  Atlas, make sure your IP address is allow-listed (Atlas → Network Access).
- **CORS errors in the browser console** — make sure `CLIENT_URL` in the backend
  `.env` exactly matches the URL your frontend runs on (including port).
- **"Not authorized" on admin routes** — your account's `role` isn't set to
  `admin` yet (see step 7).
- **Blank white screen** — open your browser console; it's almost always a typo
  in an import path if you've renamed a file.

Enjoy building out Jimtoz! 🥖
