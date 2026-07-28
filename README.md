# Backend Marketplace - Company Onboarding & Job Posting

## Overview

This project implements the backend foundation for a marketplace platform where companies can register, create profiles, and publish jobs with skill-based eligibility thresholds.

The application is built using Node.js, Express.js, PostgreSQL, and Prisma ORM with JWT-based authentication, password hashing, Zod validation, and a threshold rules engine for job assessments.

---

## Features

* Company Registration API
* Company Profile Creation
* Company Profile Retrieval
* JWT Authentication
* Password Hashing using bcrypt
* Request Validation using Zod
* Job Posting API
* Skill Threshold Management
* Threshold Rules Engine
* Per-job Assessment Link Generation
* PostgreSQL Database
* Prisma ORM & Migrations
* Dockerized PostgreSQL
* Secure API development using Helmet and CORS

---

## Tech Stack

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

## Project Structure

```
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
└── prisma.config.ts
```

---

## Installation

### Clone the repository

```bash
git clone <repository-url>
cd Task1_P2
```

### Install dependencies

```bash
npm install
```

### Start PostgreSQL

```bash
docker compose up -d
```

### Run Prisma Migration

```bash
npx prisma migrate dev
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Start the Server

```bash
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

## Environment Variables

Create a `.env` file in the project root and add the following variables:

```env
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database_name>"
PORT=3000
JWT_SECRET=your_jwt_secret_key
```

---

# API Endpoints

## Company APIs

### Company Signup

**POST**

```
/api/company/signup
```

Sample Request:

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

```
/api/company/:id
```

Example:

```
GET /api/company/b0e0f807-ccbd-4fe7-9441-dbb6e19e7925
```

---

# Job APIs

## Create Job

**POST**

```
/api/jobs
```

Sample Request:

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

## Get Job Details

**GET**

```
/api/jobs/:id
```

Returns:

* Job details
* Company information
* Skill thresholds
* Generated assessment link

---

# Validation

Company registration validates:

* Company Name
* Company Email
* Password
* Phone Number
* Website
* Industry
* Location
* Description

Job posting validates:

* Job title
* Job description
* Company ID
* Skill names
* Skill threshold values

Threshold rules:

* Threshold must be an integer
* Minimum value: 0
* Maximum value: 100

---

# Security

* Passwords are hashed using bcrypt.
* JWT tokens are generated after successful registration.
* Helmet secures HTTP headers.
* CORS enabled.
* Input validation implemented using Zod.
* Sensitive data such as passwords is not returned in API responses.

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

* Marketplace entities modeled
* Database schema migrated using Prisma
* Company onboarding implemented
* Company profile creation
* Company profile retrieval
* JWT authentication
* Password hashing
* Zod validation
* PostgreSQL integration
* Prisma ORM implementation
* Job posting with skill thresholds
* Threshold rules engine
* Automatic assessment link generation
* Job retrieval with company and threshold details

---

## Author

**Bhoomi**