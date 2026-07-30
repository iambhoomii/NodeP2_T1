# Backend Marketplace - Company Onboarding, Job Posting & Search

## Overview

This project implements the backend foundation for a marketplace platform where companies can register, manage their profiles, publish jobs with skill-based eligibility thresholds, and provide search and discovery APIs for job listings.

The application is built using Node.js, Express.js, PostgreSQL, and Prisma ORM with JWT authentication, bcrypt password hashing, Zod validation, and a simple search ranking mechanism.

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
│   │   └── job.controller.js
│   │
│   ├── routes/
│   │   ├── company.routes.js
│   │   └── job.routes.js
│   │
│   ├── utils/
│   │   └── prisma.js
│   │
│   ├── validators/
│   │   ├── company.validator.js
│   │   └── job.validation.js
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

Sample Request

```json
{
  "companyName": "TechNova",
  "companyEmail": "admin@example.com",
  "password": "SecurePassword123",
  "phone": "9876543210",
  "website": "https://technova.com",
  "industry": "Software",
  "location": "Bangalore",
  "description": "Software development company"
}
```

---

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

Sample Request

```json
{
  "companyId": "company_uuid",
  "title": "Frontend Developer",
  "description": "React developer with Node.js knowledge",
  "location": "Bangalore",
  "experience": "2 Years",
  "thresholds": [
    {
      "skill": "React",
      "threshold": 80
    },
    {
      "skill": "JavaScript",
      "threshold": 75
    },
    {
      "skill": "Node.js",
      "threshold": 70
    }
  ]
}
```

---

### Get Job Details

**GET**

```text
/api/jobs/:id
```

Returns:

* Job details
* Company information
* Skill thresholds
* Assessment link

---

## Search Jobs

**GET**

```text
/api/jobs/search
```

Examples

```text
GET /api/jobs/search
```

```text
GET /api/jobs/search?keyword=React
```

```text
GET /api/jobs/search?location=Bangalore
```

```text
GET /api/jobs/search?experience=2 Years
```

```text
GET /api/jobs/search?keyword=React&location=Bangalore
```

The search endpoint supports:

* Keyword-based search
* Location filtering
* Experience filtering
* Ranked job results based on keyword relevance

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
* Threshold Value

Threshold Rules:

* Minimum: 0
* Maximum: 100

---

# Security

* Passwords hashed using bcrypt
* JWT authentication
* Helmet security headers
* CORS enabled
* Zod request validation
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

## CompanyKYC

* id
* companyId
* status
* documentUrl
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

---

# Author

**Bhoomi**
