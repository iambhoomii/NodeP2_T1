# Backend Marketplace - Company Onboarding, Job Posting, Applications, Search & Payment Integration

## Overview

This project implements the backend foundation for a marketplace platform where companies can register, manage their profiles, publish job openings with skill-based eligibility thresholds, receive student applications, search job listings, and support a complete pay-per-application workflow using Razorpay Test Mode.

The backend is developed using **Node.js, Express.js, PostgreSQL, Prisma ORM, Razorpay, JWT Authentication, bcrypt, and Zod validation**. It provides an end-to-end marketplace workflow covering company onboarding, job posting, application management, payment processing, payment verification, and gated application submission.

---

# Features

## Company Management

- Company Registration
- Company Profile Creation
- Company Profile Retrieval
- JWT Authentication
- Password Hashing using bcrypt

## Job Management

- Create Job Postings
- Associate Jobs with Companies
- Skill Threshold Management
- Automatic Assessment Link Generation
- Company-wise Job Listings

## Application Management

- Student Job Applications
- Duplicate Application Prevention
- View Applications by Job
- Candidate Shortlisting
- Application Status Tracking

### Payment Management

* Razorpay Test Mode Integration
* Create Payment Orders
* Verify Payment Signatures
* Payment Status Tracking
* Payment Persistence
* Duplicate Payment Prevention (Idempotency)

## Search & Discovery

- Keyword Search
- Location Filtering
- Experience Filtering
- Ranked Search Results
- Job Discovery API

## Payment Management

- Razorpay Test Mode Integration
- Payment Order Creation
- Payment Signature Verification
- Payment Status Tracking
- Duplicate Pending Payment Prevention
- Pay-per-Application Workflow
- Application Access Gated Until Successful Payment
- Payment Details Retrieval

## Backend Features

- Prisma ORM
- PostgreSQL Database
- Dockerized PostgreSQL
- RESTful APIs
- Zod Validation
- Helmet Security
- CORS Support

---

# Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Razorpay
- Docker
- JWT
- bcrypt
- Zod
- dotenv
- Helmet
- CORS

---

# Project Structure

```text
Task1_P2/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   │   ├── company.controller.js
│   │   ├── job.controller.js
│   │   ├── application.controller.js
│   │   └── payment.controller.js
│   │
│   ├── routes/
│   │   ├── company.routes.js
│   │   ├── job.r├── src/
│   ├── controllers/
│   │   ├── company.controller.js
│   │   ├── job.controller.js
│   │   ├── application.controller.js
│   │   └── payment.controller.js
│   │
│   ├── routes/
│   │   ├── company.routes.js
│   │   ├── job.routes.js
│   │   ├── application.routes.js
│   │   └── payment.routes.js
│   │
│   ├── validators/
│   │   ├── company.validator.js
│   │   ├── job.validation.js
│   │   ├── application.validation.js
│   │   └── payment.validation.js
│   │
│   ├── utils/
│   │   ├── prisma.js
│   │   └── razorpay.js
│   │
│   └── server.js
│
├── prisma.config.ts
├── docker-compose.yml
├── package.json
├── package-lock.json
├── .env
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd Task1_P2
```

## Install Dependencies

```bash
npm install
```

## Start PostgreSQL

```bash
docker compose up -d
```

## Run Prisma Migrations

```bash
npx prisma migrate dev
```

## Generate Prisma Client

```bash
npx prisma generate
```

## Start Development Server

```bash
npm run dev
```

Server URL

```text
http://localhost:3000
```

---

# Environment Variables

Create a `.env` file.

```env
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database_name>"
PORT=3000
JWT_SECRET=your_jwt_secret_key

RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

---

# API Endpoints

## Company APIs

### Register Company

**POST**

```text
/api/company/signup
```

### Get Company Profile

**GET**

```text
/api/company/:id
```

---

## Job APIs

### Create Job

**POST**

```text
/api/jobs
```

### Get Job Details

**GET**

```text
/api/jobs/:id
```

### Search Jobs

**GET**

```text
/api/jobs/search
```

Supports:

- Keyword Search
- Location Filter
- Experience Filter
- Ranked Search Results

---

## Application APIs

### Apply for Job

**POST**

```text
/api/applications
```

Sample Request

```json
{
  "studentId": "student_uuid",
  "jobId": "job_uuid"
}
```

---
## Payment APIs

### Create Payment Order

**POST**

```text
/api/payments/create-order
```

### Verify Payment

**POST**

```text
/api/payments/verify
```

### Get Payment Details

**GET**

```text
/api/payments/:id
```
---
### Get Applications for a Job

**GET**

```text
/api/applications/job/:jobId
```

### Shortlist Candidate

**PATCH**

```text
/api/applications/:applicationId/shortlist
```

---

## Payment APIs

### Create Payment Order

**POST**

```text
/api/payments/create-order
```

Sample Request

```json
{
  "applicationId": "application_uuid",
  "amount": 199
}
```

Creates a Razorpay order in **Test Mode** and stores the payment record in the database.

---

### Verify Payment

**POST**

```text
/api/payments/verify
```

Sample Request

```json
{
  "razorpay_order_id": "order_xxxxxxxxx",
  "razorpay_payment_id": "pay_xxxxxxxxx",
  "razorpay_signature": "signature_xxxxxxxxx"
}
```

Verifies the Razorpay payment signature and updates the payment status.

---

### Capture & Apply (Pay-per-Application)

**POST**

```text
/api/payments/capture-and-apply
```

Sample Request

```json
{
  "paymentId": "payment_uuid",
  "studentId": "student_uuid",
  "jobId": "job_uuid"
}
```

This endpoint validates that the payment was completed successfully before allowing the application to proceed.

---

### Get Payment Details

**GET**

```text
/api/payments/:id
```

Returns payment details together with the related application, student, and job information.

---

# Validation

### Company Validation

- Company Name
- Company Email
- Password
- Phone Number
- Website
- Industry
- Location
- Description

### Job Validation

- Company ID
- Job Title
- Job Description
- Skill Name
- Threshold Value

Threshold Rules

- Minimum Threshold: **0**
- Maximum Threshold: **100**

### Application Validation

- Student ID (UUID)
- Job ID (UUID)
- Duplicate Application Prevention
- Existing Student Validation
- Existing Job Validation

### Payment Validation

- Application ID Validation
- Payment Amount Validation
- Razorpay Order ID Validation
- Razorpay Payment ID Validation
- Razorpay Signature Validation
- Duplicate Pending Payment Prevention

---

# Security

- JWT Authentication
- Password Hashing using bcrypt
- Helmet Security Headers
- CORS Enabled
- Zod Request Validation
- Duplicate Application Prevention
- Razorpay Signature Verification
- Payment Status Validation
- Application Access Gated by Payment Status
- Sensitive information excluded from API responses

---

# Database Models

## Company

- id
- name
- email
- phone
- website
- industry
- description
- location
- logo
- createdAt
- updatedAt

## User

- id
- name
- email
- password
- role
- companyId
- createdAt
- updatedAt

## CompanyKYC

- id
- companyId
- documentType
- documentNumber
- documentUrl
- status
- submittedAt
- verifiedAt

## Job

- id
- title
- description
- location
- experience
- assessmentLink
- companyId
- createdAt
- updatedAt

## SkillThreshold

- id
- skill
- threshold
- jobId
- createdAt

## Application

- id
- studentId
- jobId
- status
- createdAt
- updatedAt

## Payment

- id
- applicationId
- amount
- currency
- gateway
- status
- razorpayOrderId
- razorpayPaymentId
- razorpaySignature
- createdAt
- updatedAt

  ## Payment

* id
* applicationId
* amount
* currency
* gateway
* status
* razorpayOrderId
* razorpayPaymentId
* razorpaySignature
* createdAt
* updatedAt

---

# Task Completion

## Phase 2 Task 1

- Marketplace entities modeled
- Company onboarding implemented
- Company profile creation
- Company profile retrieval
- JWT authentication
- Prisma integration

## Phase 2 Task 2

- Job posting implemented
- Skill threshold management
- Threshold rules engine
- Assessment link generation

## Phase 2 Task 3

- Search service implemented
- Discovery API created
- Keyword search
- Location filtering
- Experience filtering
- Ranked search results

## Phase 2 Task 4

- Student application service implemented
- Duplicate application prevention
- View applications by job
- Candidate shortlisting
- Application status tracking

## Phase 2 Task 5

- Marketplace APIs stabilized
- End-to-end marketplace workflow completed
- Company → Job → Application → Shortlisting flow verified
- Improved validation and integration handling
- Stable APIs ready for frontend integration

## Phase 2 Task 6

- Payment entity implemented
- Razorpay Test Mode integration
- Payment order creation
- Payment verification
- Payment status persistence
- Payment retrieval API
- Duplicate pending payment prevention

## Phase 2 Task 7

- Pay-per-Application workflow implemented
- Payment capture integrated with application flow
- Successful payment required before application processing
- Application access gated by payment status
- End-to-end payment flow verified in Test Mode
- Payment and application data persisted in PostgreSQL

## Phase 2 Task 6

* Payment data model implemented
* Razorpay test mode integration completed
* Payment order creation API
* Payment verification API
* Payment status tracking
* Payment persistence using PostgreSQL
* Idempotency implemented to prevent duplicate payments
* Payment workflow tested using Postman

---

# Future Improvements

- Razorpay Webhooks
- Automatic Payment Capture
- Payment Refund APIs
- Payment Reconciliation Reports
- Transaction Logs
- Role-based Authorization
- Pagination
- Authentication Middleware
- Company Dashboard
- Student Dashboard
- Email Notifications
- Resume Upload

---

# Author

**Bhoomi**