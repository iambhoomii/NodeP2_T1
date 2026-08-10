# Backend Marketplace API

A backend marketplace application built using **Node.js, Express.js, PostgreSQL, Prisma ORM, Docker, and Razorpay Test Mode**.

The project supports company onboarding, job posting, student applications, payments, revenue analytics, offer generation, e-sign integration, offer integrity verification, interview scheduling, and end-to-end application status tracking.

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
* Application status history
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
* E-sign provider validation
* Offer signing
* Duplicate signing prevention
* Offer persistence
* Offer status tracking
* SHA-256 offer integrity verification
* Tamper detection
* Public offer verification

### Trust Layer

* Mock eSign integration
* Valid eSign provider validation
* Signed offer verification
* SHA-256 signature hash generation
* Tamper-evident offer data
* Detection of modified offer information
* Duplicate signing protection
* End-to-end trust-layer dry run
* Verification of persisted offer data

### Interview Scheduling

* Schedule interviews
* Application-based interview scheduling
* Interview duration
* Interviewer details
* Meeting link
* Interview status tracking
* Persistent interview records

### End-to-End Status Tracking

* Application status tracking
* Application status history
* Previous status tracking
* Status change timestamp
* Status change reason
* Current application status
* Interview information in application status
* Offer information in application status
* End-to-end application → interview → offer flow

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
* SHA-256 / Node.js Crypto

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
│   │   ├── application.controller.js
│   │   ├── company.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── interview.controller.js
│   │   ├── job.controller.js
│   │   ├── offer.controller.js
│   │   ├── payment.controller.js
│   │   └── status.controller.js
│   │
│   ├── routes
│   │   ├── application.routes.js
│   │   ├── company.routes.js
│   │   ├── dashboard.routes.js
│   │   ├── interview.routes.js
│   │   ├── job.routes.js
│   │   ├── offer.routes.js
│   │   ├── payment.routes.js
│   │   └── status.routes.js
│   │
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

# API Endpoints

## Company

```text
POST /api/company/signup
GET  /api/company/:id
```

## Jobs

```text
POST /api/jobs
GET  /api/jobs/:id
GET  /api/jobs/search
```

## Applications

```text
POST  /api/applications
GET   /api/applications/job/:jobId
PATCH /api/applications/:applicationId/shortlist
GET   /api/applications/:applicationId
```

## Application Status

```text
GET /api/applications/:applicationId
```

Returns:

* Current application status
* Status history
* Interviews
* Offer details

Example flow:

```text
APPLIED
   ↓
SHORTLISTED
   ↓
INTERVIEW_SCHEDULED
   ↓
INTERVIEW_COMPLETED
   ↓
SELECTED
   ↓
OFFER_GENERATED
   ↓
OFFER_SENT
   ↓
OFFER_SIGNED
```

## Payments

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

## Revenue

```text
GET /api/dashboard/revenue
```

## Offers

```text
POST  /api/offers/generate
PATCH /api/offers/:offerId/esign
GET   /api/offers/verify/:offerId
```

### Offer Trust Flow

```text
Generate Offer
      ↓
Select eSign Provider
      ↓
Validate Provider
      ↓
Sign Offer
      ↓
Generate SHA-256 Hash
      ↓
Persist Signature Hash
      ↓
Verify Offer
      ↓
Compare Stored Hash
      ↓
Authentic / Tampered
```

### Supported eSign Provider

```text
MOCK_ESIGN
```

The current implementation uses a mock eSign provider. A real provider can be integrated later.

### Offer Integrity Verification

The offer's important business fields are converted into a canonical representation and hashed using SHA-256.

The following data is included in the integrity hash:

```text
offerNumber
applicationId
candidateName
companyName
jobTitle
salary
joiningDate
expiryDate
```

Database metadata such as `createdAt` and `updatedAt` is intentionally excluded.

If the offer data changes after signing, the newly generated hash will differ from the stored signature hash.

Example successful verification:

```json
{
  "verified": true,
  "tampered": false
}
```

Example tamper detection:

```json
{
  "verified": false,
  "tampered": true
}
```

## Interviews

```text
POST /api/interviews/schedule
GET  /api/interviews/:id
```

---

# Validation & Security

* JWT authentication
* bcrypt password hashing
* Zod request validation
* UUID validation
* Razorpay signature verification
* Idempotent payment requests
* Duplicate application prevention
* Duplicate offer prevention
* Duplicate signing prevention
* eSign provider validation
* Offer integrity verification
* SHA-256 tamper detection
* Helmet security
* CORS protection

---

# Database Models

```text
Company
User
CompanyKYC
Job
SkillThreshold
Application
ApplicationStatusHistory
Payment
Offer
Interview
```

### Application Status History

Each application status change can be persisted with:

```text
applicationId
status
previousStatus
changedAt
changedBy
reason
```

This provides an auditable history of the application lifecycle.

---

# End-to-End Application Flow

```text
Company
   ↓
Create Job
   ↓
Student Applies
   ↓
Application Created
   ↓
Candidate Shortlisted
   ↓
Interview Scheduled
   ↓
Interview Completed
   ↓
Candidate Selected
   ↓
Offer Generated
   ↓
eSign Provider Selected
   ↓
Offer Signed
   ↓
SHA-256 Integrity Hash Generated
   ↓
Offer Verification
   ↓
Authentic / Tampered
```

---

# Task 15 — Trust Layer Integration & Dry Run

Task 15 focuses on stabilizing the trust layer and proving that a signed offer can be verified end-to-end.

### Implemented

* eSign provider validation
* Mock eSign provider integration
* Offer signing
* Duplicate signing prevention
* SHA-256 signature generation
* Persistent signature hash
* Offer integrity verification
* Tamper detection
* Restoration and re-verification
* End-to-end dry run using real persisted data

### Verified Test Cases

#### 1. Missing eSign Provider

```text
eSignProvider is required
```

#### 2. Invalid eSign Provider

```text
Invalid eSign provider
```

Allowed provider:

```text
MOCK_ESIGN
```

#### 3. Successful Signing

```text
Offer signed successfully
```

The offer receives:

```text
signed = true
status = SIGNED
signedAt = timestamp
signatureHash = SHA-256 hash
```

#### 4. Duplicate Signing

```text
Offer is already signed
```

#### 5. Valid Integrity Verification

```text
verified = true
tampered = false
```

#### 6. Tamper Detection

After changing the salary of a signed offer:

```text
verified = false
tampered = true
```

The stored hash and newly calculated hash differ.

#### 7. Restored Verification

After restoring the original offer data:

```text
verified = true
tampered = false
```

---

# Phase 2 Tasks

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
* **Task 14:** End-to-End Status Tracking & Parsing
* **Task 15:** Trust Layer Integration & Dry Run

---

# Future Improvements

* Real digital signature provider integration
* Offer PDF generation
* Email notifications
* Offer acceptance/rejection
* Role-based authorization
* Pagination
* Student & company dashboards
* Razorpay webhooks
* Structured logging
* Monitoring and alerting
* Resume parsing
* Advanced job-description parsing
* Production eSign provider integration

---

## Author

**Bhoomi**
