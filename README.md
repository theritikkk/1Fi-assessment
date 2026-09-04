# 1Fi SDE Assignment — Mutual Fund Powered Product & EMI Web Application

> Production-grade full-stack fintech web application built for the **1Fi SDE Internship Technical Evaluation**. It allows users to browse flagship consumer electronics (smartphones & laptops), configure real color and storage variants, explore dynamic Mutual Fund-backed EMI plans with 0% interest and instant cashbacks, and complete a simulated loan checkout flow.

---

## 🔗 Demo Links

- **Live Demo**: `[ADD LINK]` (e.g. `https://1fi-assessment.vercel.app`)
- **Backend API**: `[ADD LINK]` (e.g. `https://onefi-api.onrender.com/health`)
- **Demo Video Walkthrough**: `[ADD LINK]` (Loom / YouTube)

---

## 🌟 Key Features

1. **Dynamic Catalog & Relational Data Flow**:
   - Zero hardcoded product or EMI data in frontend components.
   - All data flows from **PostgreSQL → Prisma ORM → Express REST API → React Frontend**.
   - 4 flagship products seeded: *Apple iPhone 17 Pro*, *Samsung Galaxy S24 Ultra*, *Google Pixel 9 Pro*, and *Apple MacBook Pro 14" (M4)*.

2. **Interactive Variant Selection**:
   - Dynamic selection across real finish colors (with hex swatches) and storage options (128GB, 256GB, 512GB, 1TB).
   - Real-time updates to product imagery, SKU pricing, discount badges, and available tenure calculations upon variant change.

3. **1Fi Mutual Fund-Backed EMI Plans**:
   - Dynamic monthly installment cards with tenure (3, 6, 9, 12, 18, 24 months).
   - Visual badges for `0% Interest (No Cost EMI)`, `Guaranteed Instant Cashback`, and `Recommended Plan`.
   - **1Fi Value Proposition Banner**: Educates users on how their mutual fund portfolio keeps compounding at ~12% p.a. while they pay zero-cost monthly installments.

4. **Proceed & Checkout Review Modal**:
   - Order review with product thumbnail, color, storage, and transparent financial breakdown (MRP, Discount, Monthly EMI, Tenure, Net Effective Cost).
   - Interactive KYC & Mutual Fund Portfolio pledge simulator with celebratory order confirmation state.

5. **Fintech UI/UX & Responsive Design**:
   - Clean, modern fintech aesthetic using Tailwind CSS with custom emerald & navy palettes.
   - Fully responsive across Mobile, Tablet, and Desktop (sticky left gallery on desktop; floating action bar on mobile).
   - Smooth skeleton loading states and robust 404 / error recovery screens.

6. **Automated Testing Suite**:
   - Comprehensive backend integration tests (Supertest + Vitest) validating all REST endpoints, slug queries, relation joins, and 404 error handling.
   - Frontend unit & integration tests (Vitest + React Testing Library) validating variant selection, EMI plan switching, and pricing calculations.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18, TypeScript, Tailwind CSS, Vite, Lucide React, React Router 6 | Responsive, type-safe client SPA |
| **Backend** | Node.js, Express, TypeScript, Helmet, CORS, Morgan | Clean RESTful API with validation & security |
| **Database & ORM**| PostgreSQL, Prisma ORM | Relational data persistence with strict foreign keys & indexes |
| **Testing** | Vitest, Supertest, React Testing Library, JSDOM | Automated testing across backend and frontend |
| **Package Manager**| npm / pnpm workspaces | Monorepo structure |

---

## 🏗️ Architecture & Data Flow

```mermaid
graph TD
    subgraph Frontend ["Client (React + TypeScript + Tailwind)"]
        UI["Product Page / Catalog Page"]
        State["useProduct Hook / Custom API Client"]
        UI <--> State
    end

    subgraph Backend ["Server (Node.js + Express + TypeScript)"]
        Routes["REST Routes (/api/products)"]
        Controller["ProductController"]
        Service["ProductService"]
        Middleware["CORS, Helmet, ErrorHandler, 404"]

        Routes --> Middleware
        Middleware --> Controller
        Controller --> Service
    end

    subgraph Database ["Data Layer (PostgreSQL + Prisma)"]
        PrismaClient["Prisma Client ORM"]
        PostgresDB[("PostgreSQL Database (onefi_assessment)")]

        Service --> PrismaClient
        PrismaClient --> PostgresDB
    end

    State -->|HTTP / JSON Requests| Routes
```

---

## 🗄️ Database Schema Design

The database schema is normalized and models real-world e-commerce & fintech lending relationships:

```prisma
model Product {
  id          String     @id @default(uuid())
  slug        String     @unique
  name        String
  brand       String
  tagline     String?
  description String     @db.Text
  baseMrp     Decimal    @db.Decimal(10, 2)
  basePrice   Decimal    @db.Decimal(10, 2)
  badge       String?    // e.g. "New Launch", "Galaxy AI Bestseller"
  rating      Decimal?   @default(4.8) @db.Decimal(2, 1)
  reviewCount Int?       @default(1250)
  highlights  String[]   // Key hardware feature bullets
  variants    Variant[]  // Relation: 1-to-many
  emiPlans    EmiPlan[]  // Relation: 1-to-many
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  @@index([slug])
}

model Variant {
  id            String   @id @default(uuid())
  productId     String
  product       Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  sku           String   @unique
  colorName     String   // e.g. "Desert Titanium"
  colorHex      String   // e.g. "#C5B49F"
  storage       String   // e.g. "256GB"
  mrp           Decimal  @db.Decimal(10, 2)
  price         Decimal  @db.Decimal(10, 2)
  imageUrl      String
  galleryImages String[]
  isDefault     Boolean  @default(false)
  inStock       Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([productId])
}

model EmiPlan {
  id              String   @id @default(uuid())
  productId       String
  product         Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  tenureMonths    Int      // e.g. 3, 6, 9, 12, 18, 24
  interestRate    Decimal  @db.Decimal(5, 2)
  monthlyPayment  Decimal  @db.Decimal(10, 2)
  cashback        Decimal  @default(0) @db.Decimal(10, 2)
  isRecommended   Boolean  @default(false)
  planType        String   @default("NO_COST")
  mfReturnBenefit String?  // e.g. "Est. MF Growth: ₹4,250"
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([productId])
}
```

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- Node.js (v18+ or v20+)
- PostgreSQL installed and running locally on port 5432 (or a remote cloud database from Neon/Supabase)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/1Fi-assessment.git
cd 1Fi-assessment
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create `.env` file in the root directory (or copy from `.env.example`):
```bash
cp .env.example .env
```

Ensure `DATABASE_URL` matches your local PostgreSQL credentials:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/onefi_assessment?schema=public"
PORT=4000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
VITE_API_URL="http://localhost:4000"
```

### 4. Run Database Migrations & Seed
```bash
# Push Prisma schema to PostgreSQL
npm run prisma:migrate --workspace=apps/backend
# or: npx prisma db push --schema=apps/backend/prisma/schema.prisma

# Seed 4 flagship products, variants, and EMI plans
npm run prisma:seed --workspace=apps/backend
```

### 5. Start Development Servers
```bash
# Run both backend and frontend concurrently
npm run dev

# Or run them individually:
npm run dev:backend   # API starts at http://localhost:4000
npm run dev:frontend  # React SPA starts at http://localhost:5173
```

---

## 🧪 Running Automated Tests

```bash
# Run full test suite (backend + frontend)
npm run test

# Run backend integration tests only
npm run test --workspace=apps/backend

# Run frontend unit tests only
npm run test --workspace=apps/frontend
```

---

## 📦 Production Builds

```bash
# Verify TypeScript compilation and bundle generation for both apps
npm run build
```

---

## 📡 REST API Documentation

### 1. Health Check
`GET /health` or `GET /api/health`

**Response (`200 OK`)**:
```json
{
  "status": "ok",
  "service": "1Fi Assessment API",
  "timestamp": "2026-09-04T12:00:00.000Z",
  "uptime": 120.45
}
```

---

### 2. Get All Products
`GET /api/products`

**Response (`200 OK`)**:
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "id": "37633771-7b80-4831-adf8-ac6e23c34874",
      "slug": "iphone-17-pro",
      "name": "Apple iPhone 17 Pro",
      "brand": "Apple",
      "tagline": "Engineered with Aerospace-grade Titanium and A19 Pro Bionic Architecture.",
      "description": "iPhone 17 Pro features a lightweight titanium design...",
      "baseMrp": 134900,
      "basePrice": 127400,
      "badge": "New Launch",
      "rating": 4.9,
      "reviewCount": 3420,
      "highlights": [
        "A19 Pro chip with 6-core GPU and hardware ray tracing",
        "48MP Pro Fusion camera system with 5x optical Telephoto"
      ],
      "startingEmi": 5840,
      "variants": [ ... ],
      "emiPlans": [ ... ]
    }
  ]
}
```

---

### 3. Get Product by Slug
`GET /api/products/:slug`

**Example Request**: `GET /api/products/iphone-17-pro`

**Response (`200 OK`)**:
```json
{
  "success": true,
  "data": {
    "id": "37633771-7b80-4831-adf8-ac6e23c34874",
    "slug": "iphone-17-pro",
    "name": "Apple iPhone 17 Pro",
    "brand": "Apple",
    "baseMrp": 134900,
    "basePrice": 127400,
    "variants": [
      {
        "id": "var-1",
        "sku": "IP17P-256-DESERT",
        "colorName": "Desert Titanium",
        "colorHex": "#C5B49F",
        "storage": "256GB",
        "mrp": 134900,
        "price": 127400,
        "imageUrl": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
        "isDefault": true,
        "inStock": true
      }
    ],
    "emiPlans": [
      {
        "id": "emi-1",
        "tenureMonths": 6,
        "interestRate": 0,
        "monthlyPayment": 21233,
        "cashback": 7500,
        "isRecommended": true,
        "planType": "NO_COST",
        "mfReturnBenefit": "Est. MF Growth during tenure: ₹4,250"
      }
    ]
  }
}
```

**Error Response (`404 Not Found`)**:
```json
{
  "success": false,
  "error": "Product with slug 'unknown-product' not found"
}
```

---

## ☁️ Deployment Guide

### 1. Database (Neon / Supabase / Render PostgreSQL)
1. Create a free PostgreSQL instance on [Neon.tech](https://neon.tech) or [Supabase](https://supabase.com).
2. Copy the connection string (`postgresql://user:password@host/db?sslmode=require`).
3. Set the `DATABASE_URL` environment variable.

### 2. Backend (Render / Railway)
1. Link your GitHub repository to [Render](https://render.com).
2. Set **Root Directory**: `apps/backend` (or build from root with `npm run build --workspace=apps/backend`).
3. **Build Command**: `npm install && npx prisma db push --schema=prisma/schema.prisma && npx tsx prisma/seed.ts && npm run build`
4. **Start Command**: `npm start`
5. **Environment Variables**:
   - `DATABASE_URL`: `[YOUR_POSTGRES_CONNECTION_STRING]`
   - `PORT`: `4000`
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: `https://[YOUR_VERCEL_APP].vercel.app`

### 3. Frontend (Vercel)
1. Import repository on [Vercel](https://vercel.com).
2. Set **Root Directory**: `apps/frontend`.
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Environment Variables**:
   - `VITE_API_URL`: `https://[YOUR_RENDER_BACKEND_URL]`
6. The included `vercel.json` automatically handles client-side React Router rewrites (`/(.*) -> /index.html`).

---

## 🎯 Technical Interview Talking Points

- **Normalized Database Design**: Kept schema strict and normalized (`Product` 1:N `Variant`, `Product` 1:N `EmiPlan`), utilizing PostgreSQL decimals for currency precision to prevent floating-point rounding errors.
- **Dynamic Variant Matrix**: Implemented an intelligent variant matching algorithm in `useProduct` hook that gracefully handles color & storage transitions without broken states.
- **Fintech User Experience**: Integrated the core 1Fi value proposition (Mutual Fund Pledging vs Credit Card Liquidation) directly into the buying decision journey.
- **Robust Error Resilience**: Implemented full UI state handling for loading skeletons, network retry, invalid slugs, and responsive mobile-first CTAs.
