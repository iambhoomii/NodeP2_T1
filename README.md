# Backend Marketplace API

A backend marketplace application built with **Node.js, Express.js, PostgreSQL, Prisma ORM, Docker, and Razorpay Test Mode**.

The API supports company onboarding, jobs, student applications, payments, offers, interviews, application tracking, and college management.

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Docker
- Razorpay Test Mode
- JWT
- bcrypt
- Zod
- Helmet
- CORS
- SHA-256

---

## Features

### Company & Jobs
- Company registration
- JWT authentication
- Job creation and search
- Skill thresholds
- Assessment links

### Applications
- Student applications
- Duplicate application prevention
- Shortlisting
- Application status tracking
- Status history

### Payments
- Razorpay Test Mode
- Payment verification
- Capture and Apply
- Refunds
- Receipts
- Payment reconciliation
- Revenue dashboard

### Offers & Trust Layer
- Offer generation
- Mock eSign integration
- Offer signing
- Duplicate signing prevention
- SHA-256 integrity verification
- Tamper detection

### Interviews
- Interview scheduling
- Interview status tracking
- Meeting links

### College Management
- College creation
- College admin creation
- Student-college association
- College application tracking
- College overview reports

---

## Project Structure

```text
Task1_P2
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── validators/
│   ├── utils/
│   └── server.js
│
├── prisma.config.ts
├── docker-compose.yml
├── package.json
└── README.md
```

---

## Installation

```bash
git clone <repository-url>
cd Task1_P2
npm install

docker compose up -d

npx prisma migrate dev
npx prisma generate

npm run dev
```

Server:

```text
http://localhost:3000
```

---

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_database_url
PORT=3000
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_test_key
RAZORPAY_KEY_SECRET=your_test_secret
```

Do not commit `.env` or real credentials.

---

## API Endpoints

### Company

```text
POST /api/company/signup
GET  /api/company/:id
```

### Jobs

```text
POST /api/jobs
GET  /api/jobs/:id
GET  /api/jobs/search
```

### Applications

```text
POST  /api/applications
GET   /api/applications/job/:jobId
PATCH /api/applications/:applicationId/shortlist
GET   /api/applications/:applicationId
```

### Payments

```text
POST /api/payments/create-order
POST /api/payments/verify
POST /api/payments/capture-and-apply
POST /api/payments/refund
GET  /api/payments/reconcile
GET  /api/payments/:id
```

### Revenue

```text
GET /api/dashboard/revenue
```

### Offers

```text
POST  /api/offers/generate
PATCH /api/offers/:offerId/esign
GET   /api/offers/verify/:offerId
```

### Interviews

```text
POST /api/interviews/schedule
GET  /api/interviews/:id
```

### Colleges

```text
POST /api/colleges
```

### College Reports

```text
GET /api/colleges/:collegeId/reports/overview
```

The college overview report provides:

```text
Students
Applications
Shortlisted
Selected
Rejected
Interviews
Offers
```

---

## Application Flow

```text
Company
   ↓
Create Job
   ↓
Student Applies
   ↓
Shortlist
   ↓
Interview
   ↓
Selection
   ↓
Offer Generation
   ↓
eSign
   ↓
Offer Verification
```

---

## College Flow

```text
Create College
      ↓
Create College Admin
      ↓
Associate Students
      ↓
Students Apply
      ↓
Track Applications
      ↓
College Overview Report
```

---

## Phase 2 Tasks

- **Task 1:** Database Design & Company Onboarding
- **Task 2:** Job Posting
- **Task 3:** Search & Discovery
- **Task 4:** Applications & Shortlisting
- **Task 5:** Marketplace Workflow
- **Task 6:** Security Enhancements
- **Task 7:** Razorpay Integration
- **Task 8:** Receipts, Refunds & Reconciliation
- **Task 9:** Payment Failure Handling
- **Task 10:** Revenue Dashboard
- **Task 11:** Offer Generation & eSign
- **Task 13:** Offer Verification & Interview Scheduling
- **Task 14:** End-to-End Status Tracking
- **Task 15:** Trust Layer Integration & Dry Run
- **Task 16:** College Management & Reporting

---

## Author

**Bhoomi**