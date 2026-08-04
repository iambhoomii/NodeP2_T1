# Backend Marketplace API

A backend marketplace application built using **Node.js**, **Express.js**, **PostgreSQL**, **Prisma ORM**, and **Razorpay Test Mode**. The project supports company onboarding, job posting, student applications, payment processing, receipts, refunds, and reconciliation.

---

# Features

## Company Management

- Company Registration
- Company Profile Retrieval
- JWT Authentication
- Password Hashing (bcrypt)

## Job Management

- Create Jobs
- Company-wise Job Management
- Skill Threshold Management
- Assessment Link Generation

## Application Management

- Student Job Applications
- Duplicate Application Prevention
- View Applications by Job
- Candidate Shortlisting
- Application Status Tracking

## Search & Discovery

- Search by Keyword
- Filter by Location
- Filter by Experience
- Ranked Search Results

## Payment Management

- Razorpay Test Mode Integration
- Create Payment Order
- Verify Payment
- Capture & Apply Workflow
- Application Gating
- Duplicate Pending Payment Prevention
- Payment Status Tracking
- Receipt Generation
- Refund Processing
- Reconciliation Report

---

# Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Docker
- Razorpay
- JWT
- bcrypt
- Zod
- Helmet
- CORS
- dotenv

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

Server

```
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

| Method | Endpoint |
|---------|----------|
| POST | `/api/company/signup` |
| GET | `/api/company/:id` |

---

## Jobs

| Method | Endpoint |
|---------|----------|
| POST | `/api/jobs` |
| GET | `/api/jobs/:id` |
| GET | `/api/jobs/search` |

---

## Applications

| Method | Endpoint |
|---------|----------|
| POST | `/api/applications` |
| GET | `/api/applications/job/:jobId` |
| PATCH | `/api/applications/:applicationId/shortlist` |

---

## Payments

| Method | Endpoint |
|---------|----------|
| POST | `/api/payments/create-order` |
| POST | `/api/payments/verify` |
| POST | `/api/payments/capture-and-apply` |
| POST | `/api/payments/receipt` |
| POST | `/api/payments/refund` |
| POST | `/api/payments/reconcile` |
| GET | `/api/payments/:id` |

---

# Validation

- Company Validation
- Job Validation
- Application Validation
- Payment Validation
- UUID Validation
- Razorpay Signature Verification
- Duplicate Application Prevention
- Duplicate Pending Payment Prevention

---

# Security

- JWT Authentication
- Password Hashing (bcrypt)
- Helmet Security
- CORS
- Zod Request Validation
- Razorpay Signature Verification

---

# Database Models

- Company
- User
- CompanyKYC
- Job
- SkillThreshold
- Application
- Payment

---

# Phase 2 Task Completion

## Task 1

- Marketplace Database Design
- Company Onboarding
- Prisma Integration
- JWT Authentication

## Task 2

- Job Posting
- Skill Thresholds
- Assessment Link Generation

## Task 3

- Search & Discovery APIs
- Keyword Search
- Location Filter
- Experience Filter

## Task 4

- Student Applications
- Candidate Shortlisting
- Application Tracking

## Task 5

- End-to-End Marketplace Workflow
- API Stabilization
- Validation Improvements

## Task 6

- Marketplace Security Enhancements
- Authentication Improvements
- Backend Optimization

## Task 7

- Razorpay Test Integration
- Payment Order Creation
- Payment Verification
- Capture & Apply Workflow
- Payment Gating

## Task 8

- Receipt Generation
- Refund Processing
- Reconciliation Report
- Financial Integrity Checks

---

# Future Improvements

- Role-Based Authorization
- Authentication Middleware
- Pagination
- Company Dashboard
- Student Dashboard
- Resume Upload
- Email Notifications
- Razorpay Webhooks
- PDF Receipts
- Automated Reconciliation

---

# Author

**Bhoomi**