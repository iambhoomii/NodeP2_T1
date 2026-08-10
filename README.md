# Backend Marketplace API

A backend marketplace application built using **Node.js, Express.js, PostgreSQL, Prisma ORM, Docker, and Razorpay Test Mode**.

The project supports company onboarding, job posting, student applications, application status tracking, payments, revenue analytics, offer generation, e-sign selection, public offer verification, interview scheduling, and job description parsing.

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

### End-to-End Status Tracking

* Application status tracking
* Status history persistence
* Previous status tracking
* Status change timestamps
* Status change reason
* Status change actor tracking
* Application status API
* Interview information linked to application status
* Offer information linked to application status

Supported application statuses:

```text
APPLIED
UNDER_REVIEW
SHORTLISTED
INTERVIEW_SCHEDULED
INTERVIEW_COMPLETED
SELECTED
OFFER_GENERATED
OFFER_SENT
OFFER_SIGNED
REJECTED
WITHDRAWN
```

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

### Job Description Parsing

* Job description parsing
* Job title extraction
* Experience extraction
* Location extraction
* Skill extraction
* Parsed job data returned through API

Example parsed response:

```json
{
  "message": "Job description parsed successfully",
  "parsedData": {
    "jobId": "d3cf6f4f-b30c-4d1c-b2de-b2d4bc261041",
    "title": "Backend Developer",
    "experience": "2 Years",
    "location": "Bangalore",
    "skills": [
      "Node.js",
      "PostgreSQL"
    ]
  }
}
```

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
│   │   ├── application.validation.js
│   │   ├── company.validator.js
│   │   ├── job.validation.js
│   │   └── payment.validation.js
│   │
│   ├── utils
│   │   ├── prisma.js
│   │   └── razorpay.js
│   │
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

---

## Jobs

```text
POST /api/jobs
GET  /api/jobs/:id
GET  /api/jobs/search
```

---

## Applications

```text
POST  /api/applications
GET   /api/applications/job/:jobId
PATCH /api/applications/:applicationId/shortlist
GET   /api/applications/:applicationId
```

### Application Status Response

```text
GET /api/applications/:applicationId
```

Returns:

* Current application status
* Complete status history
* Interview records
* Offer details

Example:

```json
{
  "applicationId": "4cc2eb6c-8167-4e31-82e5-02311e464aff",
  "currentStatus": "SHORTLISTED",
  "statusHistory": [
    {
      "status": "APPLIED",
      "previousStatus": null,
      "changedBy": "11111111-1111-4111-8111-111111111111",
      "reason": "Application submitted"
    },
    {
      "status": "SHORTLISTED",
      "previousStatus": "APPLIED",
      "changedBy": "COMPANY_ADMIN",
      "reason": "Candidate shortlisted"
    }
  ],
  "interviews": [],
  "offer": null
}
```

---

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

---

## Revenue

```text
GET /api/dashboard/revenue
```

---

## Offers

```text
POST  /api/offers/generate
PATCH /api/offers/:offerId/esign
POST  /api/offers/:offerId/verify
```

---

## Interviews

```text
POST /api/interviews/schedule
GET  /api/interviews/:id
```

Example scheduling request:

```json
{
  "applicationId": "4cc2eb6c-8167-4e31-82e5-02311e464aff",
  "scheduledAt": "2026-08-15T10:00:00.000Z",
  "duration": 60,
  "interviewer": "TechNova Hiring Manager",
  "meetingLink": "https://meet.google.com/test-interview"
}
```

---

## Job Description Parsing

The application supports parsing a job description and returning structured information.

Example endpoint:

```text
GET /api/jobs/:jobId/parse
```

Example response:

```json
{
  "message": "Job description parsed successfully",
  "parsedData": {
    "jobId": "d3cf6f4f-b30c-4d1c-b2de-b2d4bc261041",
    "title": "Backend Developer",
    "experience": "2 Years",
    "location": "Bangalore",
    "skills": [
      "Node.js",
      "PostgreSQL"
    ]
  }
}
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
* Offer integrity verification using SHA-256
* Helmet security
* CORS protection
* Database constraints
* Persistent status history

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

### ApplicationStatusHistory

Tracks every important application status transition.

Stored information includes:

```text
id
applicationId
status
previousStatus
changedAt
changedBy
reason
```

This provides an auditable timeline of the application lifecycle.

---

# End-to-End Application Flow

```text
Student Applies
      ↓
APPLIED
      ↓
Candidate Shortlisted
      ↓
SHORTLISTED
      ↓
Interview Scheduled
      ↓
INTERVIEW_SCHEDULED
      ↓
Interview Completed
      ↓
INTERVIEW_COMPLETED
      ↓
Candidate Selected
      ↓
SELECTED
      ↓
Offer Generated
      ↓
OFFER_GENERATED
      ↓
Offer Sent
      ↓
OFFER_SENT
      ↓
Offer Signed
      ↓
OFFER_SIGNED
```

Each application status transition can be persisted in `ApplicationStatusHistory`.

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
* **Task 14:** End-to-End Status Tracking & Job Description Parsing

---

# Future Improvements

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
* Advanced resume parsing
* Resume-to-JD skill matching
* Automated application status transitions

---

## Author

**Bhoomi**
