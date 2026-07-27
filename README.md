# Backend Marketplace - Company Onboarding

## Overview

This project implements the backend foundation for a marketplace platform where companies can register, create their profiles, and prepare for future marketplace operations.

The application is built using Node.js, Express.js, PostgreSQL, and Prisma ORM, with JWT-based authentication and Zod validation.

---

## Features

- Company Registration API
- Company Profile Creation
- Company Profile Retrieval
- JWT Authentication
- Password Hashing using bcrypt
- Request Validation using Zod
- PostgreSQL Database
- Prisma ORM & Migrations
- Dockerized PostgreSQL

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Docker
- JWT
- bcrypt
- Zod
- dotenv
- Helmet
- CORS

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
│   │   └── company.controller.js
│   ├── routes/
│   │   └── company.routes.js
│   ├── utils/
│   │   └── prisma.js
│   ├── validators/
│   │   └── company.validator.js
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

Create a `.env` file:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/marketplace"
PORT=3000
JWT_SECRET=mySuperSecretKey123
```

---

## API Endpoints

### Company Signup

**POST**

```
/api/company/signup
```

Sample Request

```json
{
  "companyName": "TechNova",
  "companyEmail": "admin@technova.com",
  "password": "Password123",
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

Example

```
GET /api/company/b0e0f807-ccbd-4fe7-9441-dbb6e19e8741
```

---

## Validation

Company registration validates:

- Company Name
- Company Email
- Password
- Phone Number
- Website
- Industry
- Location
- Description

---

## Security

- Passwords are hashed using bcrypt.
- JWT tokens are generated after successful registration.
- Helmet secures HTTP headers.
- CORS enabled.
- Input validation using Zod.
- Sensitive data such as passwords is not returned in API responses.

---

## Database Models

### Company

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

### User

- id
- name
- email
- password
- role
- companyId
- createdAt

### CompanyKYC

- id
- companyId
- status
- documentUrl
- verifiedAt

---

## Task Completion

- Marketplace entities modeled
- Marketplace entities migrated
- Company onboarding implemented
- Company profile creation
- Company profile retrieval
- JWT authentication
- Zod validation
- PostgreSQL integration
- Prisma ORM implementation

---

## Author

**Bhoomi**

