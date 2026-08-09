# Backend Marketplace API

A backend marketplace application built using **Node.js, Express.js, PostgreSQL, Prisma ORM, Docker, and Razorpay Test Mode**.

The project supports company onboarding, job posting, student applications, payments, revenue analytics, offer generation, e-sign selection, public offer verification, and interview scheduling.

---

## Features

### Company Management

* Company registration
* Company profile retrieval
* JWT authentication
* Password hashing with bcrypt

### Job & Application Management

* Job creation and retrieval
* Skill threshold management
* Assessment link generation
* Student applications
* Duplicate application prevention
* Candidate shortlisting
* Application status tracking
* Job search and filtering

### Payment Management

* Razorpay Test Mode
* Payment order creation
* Payment verification
* Capture & Apply workflow
* Idempotency and retry protection
* Payment failure handling
* Receipt generation
* Refund processing
* Payment reconciliation
* Payment lookup

### Revenue Dashboard

* Total revenue
* Successful payments
* Refunded payments
* Failed payments

### Offer Management

* Offer generation
* Automatic offer number generation
* Candidate eligibility validation
* Duplicate offer prevention
* E-sign provider selection
* Offer persistence
* Offer status tracking
* SHA-256 offer integrity verification
* Public offer verification

### Interview Scheduling

* Schedule interviews
* Application-based interview scheduling
* Interview duration
* Interviewer details
* Meeting link
* Interview status tracking
* Persistent interview records

---

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* Docker
* Razorpay Test Mode
* JWT
* bcrypt
* Zod
* Helmet
* CORS
* dotenv

---

## Project Structure

```text
Task1_P2
│
├── prisma
│   ├── migrations
│   └── schema.prisma
│
├── src
│   ├── controllers
│   ├── routes
│   ├── validators
│   ├── utils
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

Create a `.env` file locally:

```env
DATABASE_URL=your_database_url
PORT=3000
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_test_key
RAZORPAY_KEY_SECRET=your_test_secret
```

**Do not commit `.env` or real credentials to GitHub.**

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
```

### Payments

```text
POST /api/payments/create-order
POST /api/payments/verify
POST /api/payments/capture-and-apply
POST /api/payments/issue-receipt
POST /api/payments/refund
POST /api/payments/fail
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
POST  /api/offers/:offerId/verify
```

### Interviews

```text
POST /api/interviews/schedule
GET  /api/interviews/:id
```

---

## Validation & Security

* JWT authentication
* bcrypt password hashing
* Zod request validation
* UUID validation
* Razorpay signature verification
* Idempotent payment requests
* Duplicate prevention
* Offer integrity verification
* Helmet security
* CORS protection

---

## Database Models

```text
Company
User
CompanyKYC
Job
SkillThreshold
Application
Payment
Offer
Interview
```

---

## Phase 2 Tasks

* **Task 1:** Database Design & Company Onboarding
* **Task 2:** Job Posting
* **Task 3:** Search & Discovery
* **Task 4:** Applications & Shortlisting
* **Task 5:** Marketplace Workflow
* **Task 6:** Security Enhancements
* **Task 7:** Razorpay Integration
* **Task 8:** Receipts, Refunds & Reconciliation
* **Task 9:** Payment Failure Handling
* **Task 10:** Revenue Dashboard
* **Task 11:** Offer Generation & E-Sign
* **Task 13:** Offer Verification & Interview Scheduling

---

## Future Improvements

* Digital signature verification
* Offer PDF generation
* Email notifications
* Offer acceptance/rejection
* Role-based authorization
* Pagination
* Student & company dashboards
* Razorpay webhooks
* Structured logging
* Monitoring and alerting

---

## Author

**Bhoomi**
