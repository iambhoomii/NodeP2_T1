# Backend Marketplace - Company Onboarding, Job Posting, Search & Applications

## Overview

This project implements the backend foundation for a marketplace platform where companies can register, manage their profiles, publish jobs with skill-based eligibility thresholds, search job listings, and manage student applications with shortlisting functionality.

The application is built using Node.js, Express.js, PostgreSQL, and Prisma ORM with JWT authentication, bcrypt password hashing, Zod validation, and a search & discovery system.

---

# Features

### Company Management

* Company Registration
* Company Profile Creation
* Company Profile Retrieval
* JWT Authentication
* Password Hashing using bcrypt

### Job Management

* Create Job Posting
* Associate Jobs with Companies
* Skill Threshold Management
* Threshold Rules Engine
* Automatic Assessment Link Generation

### Search & Discovery

* Search Jobs by Keyword
* Filter Jobs by Location
* Filter Jobs by Experience
* Ranked Search Results
* Discovery API for Job Listings

### Applications & Shortlisting

* Student Job Application
* View Applications by Job
* Candidate Shortlisting
* Duplicate Application Prevention

### Backend

* Prisma ORM
* PostgreSQL Database
* Dockerized PostgreSQL
* Zod Validation
* Helmet Security
* CORS Support

---

# Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* Docker
* JWT
* bcrypt
* Zod
* dotenv
* Helmet
* CORS

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
│   │   └── application.controller.js
│   │
│   ├── routes/
│   │   ├── company.routes.js
│   │   ├── job.routes.js
│   │   └── application.routes.js
│   │
│   ├── utils/
│   │   └── prisma.js
│   │
│   ├── validators/
│   │   ├── company.validator.js
│   │   ├── job.validation.js
│   │   └── application.validation.js
│   │
│   └── server.js
│
├── .env
├── docker-compose.yml
├── package.json
├── prisma.config.ts
└── README.md
```

---

# Installation

### Clone Repository

```bash
git clone <repository-url>
cd Task1_P2
```

### Install Dependencies

```bash
npm install
```

### Start PostgreSQL

```bash
docker compose up -d
```

### Run Prisma Migrations

```bash
npx prisma migrate dev
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Start Development Server

```bash
npm run dev
```

Server:

```text
http://localhost:3000
```

---

# Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database_name>"
PORT=3000
JWT_SECRET=your_jwt_secret_key
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

Examples

```text
GET /api/jobs/search
GET /api/jobs/search?keyword=React
GET /api/jobs/search?location=Bangalore
GET /api/jobs/search?experience=2 Years
GET /api/jobs/search?keyword=React&location=Bangalore
```

Supports:

* Keyword Search
* Location Filter
* Experience Filter
* Ranked Job Results

---

## Application APIs

### Apply for a Job

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

### View Applications for a Job

**GET**

```text
/api/applications/job/:jobId
```

Returns all applications submitted for a specific job.

---

### Shortlist Candidate

**PATCH**

```text
/api/applications/:applicationId/shortlist
```

Updates the application status to **SHORTLISTED**.

---

# Validation

### Company Validation

* Company Name
* Company Email
* Password
* Phone Number
* Website
* Industry
* Location
* Description

### Job Validation

* Company ID
* Job Title
* Job Description
* Skill Name
* Threshold Value (0–100)

### Application Validation

* Student ID (UUID)
* Job ID (UUID)
* Prevent duplicate applications for the same student and job

---

# Security

* Passwords hashed using bcrypt
* JWT authentication
* Helmet security headers
* CORS enabled
* Zod request validation
* Duplicate application prevention
* Sensitive information excluded from API responses

---

# Database Models

## Company

* id
* name
* email
* phone
* website
* industry
* description
* location
* logo
* createdAt
* updatedAt

## User

* id
* name
* email
* password
* role
* companyId
* createdAt
* updatedAt

## CompanyKYC

* id
* companyId
* documentType
* documentNumber
* documentUrl
* status
* submittedAt
* verifiedAt

## Job

* id
* title
* description
* location
* experience
* assessmentLink
* companyId
* createdAt
* updatedAt

## SkillThreshold

* id
* skill
* threshold
* jobId
* createdAt

## Application

* id
* studentId
* jobId
* status
* createdAt
* updatedAt

---

# Task Completion

## Phase 2 Task 1

* Marketplace entities modeled
* Company onboarding implemented
* Company profile creation
* Company profile retrieval
* JWT authentication
* Prisma integration

## Phase 2 Task 2

* Job posting implemented
* Skill threshold management
* Threshold rules engine
* Assessment link generation

## Phase 2 Task 3

* Search service implemented
* Discovery API created
* Keyword search
* Location filtering
* Experience filtering
* Ranked job search results

## Phase 2 Task 4

* Application service implemented
* Student job application
* View applications by job
* Candidate shortlisting
* Duplicate application prevention
* PostgreSQL persistence using Prisma ORM

---

# Author

**Bhoomi**
