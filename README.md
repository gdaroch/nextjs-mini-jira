# Mini Jira – Personal Practice Project

## Overview

This is a **personal project** I started to practice and refresh what I learned in recent courses, mainly about **Next.js (App Router)** and backend development.

The goal of this project is **learning and practice**, not building a full Jira clone.  
I keep the scope small on purpose and focus on **clean structure, clear code, and good backend habits**.

This repository is also a **personal reference**, so I can remember architectural decisions in the future.

---

## Learning Context & Use of AI

This project is being developed **manually by me**, but with **AI assistance used as a support tool**:

- to clarify concepts
- to discuss architectural decisions
- to review code and documentation
- to help debug issues

The AI **does not generate the project automatically**, nor does it replace the implementation work.  
All design decisions, coding, and experimentation are done intentionally as part of the learning process.

I believe being transparent about this reflects how modern developers actually learn and work today.

Courses related to this project:

- **React Essential Training: Building Modern User Interfaces with React**  
  LinkedIn Learning  
  https://www.linkedin.com/learning/react-essential-training/building-modern-user-interfaces-with-react

- **Learn Next.js**  
  Codecademy  
  https://www.codecademy.com/learn/learn-next-js

---

## Technologies Used

- **Next.js** (App Router, Route Handlers)
- **TypeScript**
- **MongoDB**
- **Mongoose**
- **Zod** (data validation)
- **Tailwind CSS**
- **Docker** (local MongoDB)
- **ESLint & Prettier**

Planned for later:

- **NextAuth / Auth.js**
- **OpenAPI / Swagger**
- **Playwright (E2E tests)**
- **Unit tests (Jest)**

---

## Directory Structure (Simplified)

app/
api/ → API endpoints

lib/
db/ → Database connection
schemas/ → Zod validation schemas
http/ → HTTP helpers

domain/ → Core project types

repositories/ → Database access logic

services/ → Business logic

models/ → Mongoose models

### Folder explanation

- **app/api/**  
  Handles HTTP requests and responses.

- **lib/**  
  Shared utilities like database connection and validation helpers.

- **domain/**  
  Main project types (Project, Ticket, etc).  
  No database or HTTP logic.

- **repositories/**  
  All database queries live here.

- **services/**  
  Application logic and rules.

- **models/**  
  MongoDB schemas using Mongoose.

---

## Current Status

- Project endpoints (create, get, get by id)
- MongoDB running with Docker
- Input validation with Zod
- Clear separation between layers
- Basic error handling

---

## Running the Project Locally

### Requirements

- Node.js
- Docker

### MongoDB

```bash
docker compose up -d

Environment Variables

Create a .env.local file:

MONGODB_URI=mongodb://127.0.0.1:27017/mini-jira

Start the app

npm install
npm run dev
```
