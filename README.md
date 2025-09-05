# ShopLite — E‑Commerce Starter (MERN + Vite + Tailwind)

A minimal, clean e‑commerce boilerplate you can run locally.

## Stack
- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express + MongoDB (Mongoose)
- Auth: JWT (login/signup)
- Media: Cloudinary (optional; you can also pass direct image URLs)

## Quick Start

### 1) Backend
```bash
cd backend
cp .env.example .env  # edit values
npm install
npm run dev
```
The API runs at `http://localhost:4000`.

**Test Endpoints**
- `GET /api/products`
- `POST /api/auth/signup`  `{ name, email, password }`
- `POST /api/auth/login`   `{ email, password }`

**Admin Product CRUD**
Send `Authorization: Bearer <token>` from an admin user (change role to "admin" directly in DB for your account).  
- `POST /api/products` (fields: `name, price, description?, category?, stock?`, and optional image upload as `image` file)
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```
- Create a `.env` file in `/frontend` if your backend URL differs:
  ```
  VITE_API_URL=http://localhost:4000
  ```
- Visit `http://localhost:5173`.

## Notes
- If you don’t configure Cloudinary, you can still create products by sending an `image` field as a URL string.
- To quickly seed data, you can POST a few products to `/api/products` after making your user an admin in MongoDB.
- This project is intentionally simple (no payment gateway, no orders). You can extend it later.

## Troubleshooting
- **MongoDB connection error**: check `MONGODB_URI` and networking (allow your IP in Atlas).
- **CORS**: This starter enables CORS broadly for local dev. For prod, restrict origins.
- **Windows path issues**: Delete `uploads/` if stuck; it’s safe to re‑create.

### 3) Seed Data
```bash
cd backend
node seed.js
```
This will create:
- Admin user → email: `admin@test.com` | password: `123456`
- Some demo products

### 4) Payments (Razorpay)
- Add keys to `backend/.env`:
  ```
  RAZORPAY_KEY_ID=your_key
  RAZORPAY_KEY_SECRET=your_secret
  ```
- Add key to `frontend/.env`:
  ```
  VITE_RAZORPAY_KEY_ID=your_key
  ```
- Then go to Cart → Checkout → Pay with Razorpay

---

# 🚀 Deployment Guide (Render)

## 1. Push to GitHub
```bash
git init
git add .
git commit -m "init ecomm project"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## 2. Backend Deploy (Render Web Service)
- New → Web Service → Connect GitHub repo
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `node server.js`
- Add Environment Variables:
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  - `RAZORPAY_KEY_ID`
  - `RAZORPAY_KEY_SECRET`
- After deploy → copy backend URL (e.g. `https://your-backend.onrender.com`)

## 3. Frontend Deploy (Render Static Site)
- New → Static Site → Connect same GitHub repo
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Add Environment Variables:
  - `VITE_API_URL = <your backend URL>`
  - `VITE_RAZORPAY_KEY_ID = <your key>`

## 4. Auto Deploy
- Enable “Auto Deploy” on both services for seamless updates.

## 5. One-Click (Optional)
- Use included `render.yaml` for automatic setup (Render → Blueprints → new → select repo).

---

# 🌐 Alternative Frontend Hosting: Netlify

If you prefer Netlify instead of Render for the frontend:

## Steps
1. Push project to GitHub (already done in Render setup).
2. Go to [Netlify](https://netlify.com) → New Site from Git.
3. Select your repository.
4. Configure build settings:
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables under "Site settings → Environment variables":
   - `VITE_API_URL = <your backend Render URL>`
   - `VITE_RAZORPAY_KEY_ID = <your key>`
6. Deploy → Netlify will give you a live URL (e.g. `https://myshop.netlify.app`).

## Why Netlify?
- Faster static delivery (CDN optimized).
- Free plan good for small projects.
- Easy custom domain binding.
