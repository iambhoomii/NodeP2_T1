# Backend Marketplace API

A backend marketplace application built using **Node.js**, **Express.js**, **PostgreSQL**, **Prisma ORM**, and **Razorpay Test Mode**. The project supports company onboarding, job posting, student applications, secure payment processing, revenue analytics, offer generation, e-sign integration, tamper-evident offer hashing, receipts, refunds, reconciliation, and resilient payment failure handling.

---

# Features

## Company Management

* Company Registration
* Company Profile Retrieval
* JWT Authentication
* Password Hashing (bcrypt)

## Job Management

* Create Jobs
* Company-wise Job Management
* Skill Threshold Management
* Assessment Link Generation

## Application Management

* Student Job Applications
* Duplicate Application Prevention
* View Applications by Job
* Candidate Shortlisting
* Application Status Tracking

## Search & Discovery

* Search by Keyword
* Filter by Location
* Filter by Experience
* Ranked Search Results

## Payment Management

* Razorpay Test Mode Integration
* Create Payment Order
* Payment Verification
* Capture & Apply Workflow
* Application Gating
* Payment Status Tracking
* Idempotency Support (Retry Protection)
* Payment Failure Handling
* Failure Reason Logging
* Receipt Generation
* Refund Processing
* Payment Reconciliation
* Payment Lookup API

## Revenue Dashboard

* Total Revenue Analytics
* Successful Payments Count
* Refunded Amount Tracking
* Refunded Payments Count
* Failed Payments Count

## Offer Management

* Generate Offer Letter
* Automatic Offer Number Generation
* Shortlisted Candidate Validation
* Duplicate Offer Prevention
* Offer Status Tracking
* E-Sign Provider Selection
* Offer Signing
* SHA-256 Tamper-Evident Hashing
* Offer Integrity Verification
* Tamper Detection
* Signed Offer Persistence
* Candidate Offer Management

---

# Tech Stack

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
* Node.js Crypto Module
* SHA-256

---

# Project Structure

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

# Installation

```bash
git clone <repository-url>

cd Task1_P2

npm install

docker compose up -d

npx prisma migrate dev

npx prisma generate

npm run dev
```

---

# Server

```text
http://localhost:3000
```

---

# Environment Variables

```env
DATABASE_URL=your_database_url

PORT=3000

JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_test_key

RAZORPAY_KEY_SECRET=your_test_secret
```

---

# API Endpoints

## Company

| Method | Endpoint            |
| ------ | ------------------- |
| POST   | /api/company/signup |
| GET    | /api/company/:id    |

---

## Jobs

| Method | Endpoint         |
| ------ | ---------------- |
| POST   | /api/jobs        |
| GET    | /api/jobs/:id    |
| GET    | /api/jobs/search |

---

## Applications

| Method | Endpoint                                   |
| ------ | ------------------------------------------ |
| POST   | /api/applications                          |
| GET    | /api/applications/job/:jobId               |
| PATCH  | /api/applications/:applicationId/shortlist |

---

## Payments

| Method | Endpoint                        |
| ------ | ------------------------------- |
| POST   | /api/payments/create-order      |
| POST   | /api/payments/verify            |
| POST   | /api/payments/capture-and-apply |
| POST   | /api/payments/issue-receipt     |
| POST   | /api/payments/refund            |
| POST   | /api/payments/fail              |
| GET    | /api/payments/reconcile         |
| GET    | /api/payments/:id               |

---

## Revenue Dashboard

| Method | Endpoint               |
| ------ | ---------------------- |
| GET    | /api/dashboard/revenue |

---

## Offers

| Method | Endpoint                    |
| ------ | --------------------------- |
| POST   | /api/offers/generate        |
| PATCH  | /api/offers/:offerId/esign  |
| POST   | /api/offers/:offerId/verify |

### Offer Signing

The e-sign endpoint selects the e-sign provider and signs the offer.

```http
PATCH /api/offers/:offerId/esign
```

Example request:

```json
{
  "eSignProvider": "MOCK_ESIGN"
}
```

A successful signing operation:

* Marks the offer as signed
* Stores the signing timestamp
* Stores the selected e-sign provider
* Changes the offer status to `SIGNED`
* Generates and persists a SHA-256 signature hash

### Offer Verification

```http
POST /api/offers/:offerId/verify
```

The verification endpoint recalculates the SHA-256 hash from the current offer data and compares it with the stored signature hash.

A valid offer returns:

```json
{
  "verified": true,
  "tampered": false
}
```

If the offer data has been modified after signing:

```json
{
  "verified": false,
  "tampered": true
}
```

---

# Tamper-Evident Offer Hashing

Signed offers use **SHA-256 hashing** to provide tamper evidence.

The hash is generated from a canonical representation of important offer data:

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

Database metadata such as `createdAt` and `updatedAt` is excluded from the hash so normal database updates do not invalidate the offer signature.

The workflow is:

```text
Offer Generated
      ↓
E-Sign Provider Selected
      ↓
Offer Signed
      ↓
Canonical Offer Data
      ↓
SHA-256 Hash Generated
      ↓
Hash Persisted in PostgreSQL
      ↓
Offer Verification
      ↓
Hash Recalculated
      ↓
Stored Hash Compared with Current Hash
      ↓
Authentic / Tampered
```

---

# Task 12 Verification

The Task 12 implementation was verified using real persisted PostgreSQL data.

### Successful Verification

After signing the offer:

```text
verified: true
tampered: false
```

The stored and recalculated hashes matched:

```text
db4a3f5da210b9191f8d56c9762a7f826eb851a0c62e3d220bcac9ac949bdd12
```

### Tampering Verification

The offer salary was temporarily changed from:

```text
₹8,00,000
```

to:

```text
₹9,00,000
```

without changing the stored signature hash.

Verification detected the modification:

```text
verified: false
tampered: true
```

The stored hash remained:

```text
db4a3f5da210b9191f8d56c9762a7f826eb851a0c62e3d220bcac9ac949bdd12
```

while the recalculated hash became:

```text
1089f2f6e41d5c1622ccdd03dd90eaf91222711668c1c6a5556000ae6690aff1
```

The offer was then restored to its original state and successfully verified again.

---

# Validation

* Company Validation
* Job Validation
* Application Validation
* Payment Validation (Zod)
* UUID Validation
* Razorpay Signature Verification
* Duplicate Application Prevention
* Duplicate Payment Prevention
* Idempotency-Key Validation
* Offer Generation Validation
* Shortlisted Candidate Validation
* Duplicate Offer Prevention
* E-Sign Provider Validation
* Already-Signed Offer Protection
* Unsigned Offer Verification Protection
* Offer Integrity Verification
* Tamper Detection

---

# Security

* JWT Authentication
* Password Hashing (bcrypt)
* Helmet Security
* CORS
* Zod Request Validation
* Razorpay Signature Verification
* Idempotent Payment Requests
* Secure Offer Generation Workflow
* SHA-256 Offer Integrity Hashing
* Tamper-Evident Offer Verification
* Protection Against Re-Signing an Already-Signed Offer

---

# Database Models

* Company
* User
* CompanyKYC
* Job
* SkillThreshold
* Application
* Payment
* Offer

### Offer Signing Fields

The `Offer` model contains:

```text
eSignProvider
signed
signedAt
signatureHash
```

These fields persist the signing state and tamper-evident hash in PostgreSQL.

---

# Phase 2 Task Completion

## Task 1

* Marketplace Database Design
* Company Onboarding
* Prisma Integration
* JWT Authentication

## Task 2

* Job Posting
* Skill Thresholds
* Assessment Link Generation

## Task 3

* Search & Discovery APIs
* Keyword Search
* Location Filter
* Experience Filter

## Task 4

* Student Applications
* Candidate Shortlisting
* Application Tracking

## Task 5

* End-to-End Marketplace Workflow
* API Stabilization
* Validation Improvements

## Task 6

* Marketplace Security Enhancements
* Authentication Improvements
* Backend Optimization

## Task 7

* Razorpay Test Integration
* Payment Order Creation
* Payment Verification
* Capture & Apply Workflow
* Payment Gating

## Task 8

* Receipt Generation
* Refund Processing
* Payment Reconciliation
* Financial Integrity Checks

## Task 9

* Failure Handling & Resilience
* Deterministic Payment Failure Handling
* Idempotency-Key Support
* Retry Protection
* Failure Reason Persistence
* Payment Lookup API
* Enhanced Payment Validation

## Task 10

* Monetization Integration
* Revenue Dashboard
* Revenue Analytics API
* Successful Payment Tracking
* Refunded Payment Tracking
* Failed Payment Analytics
* End-to-End Payment Stabilization

## Task 11

* Offer Data Model Design
* Offer Generation API
* Automatic Offer Number Generation
* Candidate Eligibility Verification
* Duplicate Offer Prevention
* Offer Persistence in Database
* E-Sign Provider Selection
* Offer Status Management
* End-to-End Offer Workflow
* Offer Lifecycle Management

## Task 12

* E-Sign Integration
* Offer Signing
* E-Sign Provider Selection
* SHA-256 Tamper-Evident Hashing
* Signature Hash Persistence
* Offer Integrity Verification
* Tamper Detection
* Signed Offer Verification
* Unsigned Offer Protection
* Already-Signed Offer Protection
* E-Sign Provider Validation
* Failure and Edge-Case Testing
* End-to-End Persistence Verification

---

# Task 12 Demo Flow

The Task 12 implementation can be demonstrated using Postman:

```text
1. Generate Offer
        ↓
2. Select E-Sign Provider & Sign
        ↓
3. SHA-256 Hash Persisted
        ↓
4. Verify Offer
        ↓
   verified: true
   tampered: false
        ↓
5. Modify Offer Data
        ↓
6. Verify Again
        ↓
   verified: false
   tampered: true
```

The verification process reads the offer from PostgreSQL and recalculates the hash, demonstrating that the integrity check is based on persisted data rather than an in-memory response.

---

# Failure & Edge-Case Testing

The following Task 12 failure scenarios were tested:

### Unsigned Offer

Attempting to verify an unsigned offer returns:

```json
{
  "message": "Offer has not been signed yet"
}
```

### Already Signed Offer

Attempting to sign an already signed offer returns:

```json
{
  "message": "Offer is already signed"
}
```

### Missing E-Sign Provider

Attempting to sign without specifying an e-sign provider returns:

```json
{
  "message": "eSignProvider is required"
}
```

### Tampered Offer

Modifying signed offer data causes:

```json
{
  "verified": false,
  "tampered": true
}
```

---

# Future Improvements

* Integration with a production e-sign provider
* Digital Signature Provider Webhooks
* Offer PDF Generation
* Email Offer Delivery
* Offer Acceptance & Rejection Workflow
* Role-Based Authorization
* Authentication Middleware
* Pagination
* Company Dashboard
* Student Dashboard
* Resume Upload
* Email Notifications
* Razorpay Webhooks
* PDF Receipt Generation
* Retry Queue for Failed Payments
* Structured Logging
* Monitoring & Alerting
* Complete Offer Audit Trail
* Multiple Signer Support

---

# Author

**Bhoomi**

```
```
