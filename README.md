


# 🎬 CineRate

<p align="center">
  <strong>A modern full-stack movie rating and review platform built with MERN.</strong><br/>
  Discover movies, rate what you watch, write reviews, and manage the catalog through an admin dashboard.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Auth-JWT%20%2B%20bcrypt-000000?style=for-the-badge" alt="JWT"/>
  <img src="https://img.shields.io/badge/Cloud-AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS"/>
</p>

---

## 🌟 Overview

**CineRate** is a full-stack movie rating and review application built with the MERN stack.

The core experience is:

> **Discover → Rate → Review → Discuss**

Users can browse movies, give ratings from **1–5 stars**, write reviews, and mark reviews containing spoilers. Administrators can manage the movie catalog and moderate reviews.

The project is being developed with a production-oriented architecture covering:

- React + Vite frontend
- Node.js + Express REST API
- MongoDB Atlas
- JWT authentication
- bcrypt password hashing
- Role-based access control
- Request validation
- Rate limiting
- Centralized error handling
- GitHub-based CI
- AWS deployment

---

# ✨ Features

## 👤 Visitor

- Browse the movie catalog
- Search movies
- Sort movies by:
  - Newest
  - Top Rated
  - Title A–Z
- Open movie details
- Read reviews

## 👤 Registered User

Everything available to visitors, plus:

- Register and login
- JWT-based authentication
- Rate movies from **1–5 stars**
- Write reviews
- Mark reviews as containing spoilers
- Update their own review
- Delete their own review

## 🛡️ Admin

Everything available to registered users, plus:

- Admin dashboard
- Add movies
- Edit movies
- Delete movies
- Delete all reviews associated with a deleted movie
- Delete reviews from any user
- Access protected admin-only routes

---

# 🧠 Core Architecture

```text
                         ┌───────────────────┐
                         │      GitHub       │
                         │     main branch  │
                         └─────────┬─────────┘
                                   │
                           CI / Deployment
                                   │
                ┌──────────────────┴──────────────────┐
                │                                     │
                ▼                                     ▼
       ┌─────────────────┐                   ┌─────────────────┐
       │ AWS Amplify     │                   │ Amazon ECS      │
       │ React + Vite    │                   │ Express API     │
       │ Frontend        │                   │ Backend         │
       └────────┬────────┘                   └────────┬────────┘
                │                                     │
                └─────────────────┬───────────────────┘
                                  ▼
                         ┌─────────────────┐
                         │ MongoDB Atlas   │
                         │    cinerate     │
                         └─────────────────┘
Deployment Note
AWS App Runner is not available to new customers as of March 31, 2026.

For a new AWS account, the planned backend deployment path is:

Docker → Amazon ECR → Amazon ECS Express Mode
The frontend deployment path is:

React + Vite → AWS Amplify
🏗️ Project Structure
CineRate/
│
├── README.md
├── .gitignore
├── .env.example
├── package.json
├── amplify.yml
│
├── client/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       │
│       ├── api/
│       │   └── api.js
│       │
│       ├── assets/
│       │   └── images/
│       │
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── MovieCard.jsx
│       │   ├── MovieGrid.jsx
│       │   ├── StarRating.jsx
│       │   ├── ReviewCard.jsx
│       │   ├── ReviewForm.jsx
│       │   ├── SearchBar.jsx
│       │   ├── SortDropdown.jsx
│       │   ├── Modal.jsx
│       │   ├── ProtectedRoute.jsx
│       │   └── AdminRoute.jsx
│       │
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── MovieDetails.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── AdminDashboard.jsx
│       │   ├── AddMovie.jsx
│       │   └── EditMovie.jsx
│       │
│       ├── context/
│       │   └── AuthContext.jsx
│       │
│       └── utils/
│           ├── auth.js
│           ├── constants.js
│           └── validators.js
│
├── server/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   ├── app.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Movie.js
│   │   └── Review.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── movieController.js
│   │   └── reviewController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── movieRoutes.js
│   │   └── reviewRoutes.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── rateLimit.js
│   │
│   ├── validators/
│   │   ├── authValidator.js
│   │   ├── movieValidator.js
│   │   └── reviewValidator.js
│   │
│   └── utils/
│       ├── generateToken.js
│       ├── asyncHandler.js
│       └── createAdmin.js
│
└── .github/
    └── workflows/
        └── ci.yml
🗄️ Data Model
The MongoDB database is:

cinerate
│
├── users
├── movies
└── reviews
Users
User
├── username
├── email
├── password
├── role
└── timestamps
Available roles:

user
admin
Passwords are stored as bcrypt hashes rather than plaintext passwords.

Movies
Movie
├── title
├── synopsis
├── poster_url
├── release_year
├── created_by
└── timestamps
Reviews
Review
├── user_id
├── movie_id
├── rating
├── body
├── spoiler_flag
└── timestamps
The backend uses a unique compound index so that:

One user → One review per movie
Average rating and review count are derived from the review data instead of being stored as duplicated fields.

🔐 Authentication & Authorization
CineRate uses JWT bearer authentication.

Authentication flow:

Register / Login
      ↓
bcrypt password verification
      ↓
JWT generated
      ↓
Token stored by frontend
      ↓
Authorization: Bearer <token>
      ↓
authMiddleware
      ↓
req.user
Authorization flow:

Authenticated User
       │
       ├── Regular authenticated operations
       │
       └── role = admin
                ↓
          adminMiddleware
                ↓
          Admin-only operations
🔌 REST API
Health Check
GET /api/health
Authentication
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
Movies
GET    /api/movies
GET    /api/movies/:id

POST   /api/movies
PUT    /api/movies/:id
DELETE /api/movies/:id
The movie create, update, and delete routes are admin-only.

Reviews
GET    /api/movies/:movieId/reviews
POST   /api/movies/:movieId/reviews
DELETE /api/reviews/:id
Creating or updating a review requires authentication.

🛡️ Backend Security
Current backend security features include:

Helmet security headers

CORS configuration

JWT authentication

bcrypt password hashing

Role-based authorization

Server-side request validation

Duplicate data protection

Review rate limiting

Centralized error handling

Environment-variable based configuration

💻 Local Development
Prerequisites
Install the following:

Node.js

npm

Git

MongoDB Atlas account

1. Clone Repository
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd CineRate
2. Configure Backend Environment
Create:

server/.env
Example:

MONGO_URI=mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER.mongodb.net/cinerate
JWT_SECRET=YOUR_LONG_RANDOM_SECRET
CLIENT_URL=http://localhost:5173
Never commit this file to GitHub.

3. Install Backend Dependencies
cd server
npm install
4. Start Backend
npm run dev
The backend runs on:

http://localhost:5000
Health endpoint:

http://localhost:5000/api/health
Expected response:

{
  "status": "OK",
  "message": "CineRate API is running"
}
5. Create Admin User
From the server directory:

node utils/createAdmin.js
Development admin credentials currently created by the utility:

Email:    admin@cinerate.com
Password: Admin@123
Role:     admin
Change the password before public deployment.

6. Configure Frontend Environment
Create:

client/.env
VITE_API_URL=http://localhost:5000/api
7. Install Frontend Dependencies
Open another terminal:

cd client
npm install
8. Start Frontend
npm run dev
Frontend:

http://localhost:5173
🧪 Local Testing Checklist
Before cloud deployment, verify the following:

[ ] Backend health endpoint works
[ ] Frontend loads
[ ] User registration works
[ ] User login works
[ ] Logout works
[ ] Admin login works
[ ] Admin dashboard loads
[ ] Admin can add a movie
[ ] Admin can edit a movie
[ ] Admin can delete a movie
[ ] Movie details page works
[ ] User can rate a movie
[ ] User can create a review
[ ] User can update their review
[ ] User can delete their review
[ ] Admin can delete any review
[ ] Search works
[ ] Sorting works
[ ] MongoDB stores users
[ ] MongoDB stores movies
[ ] MongoDB stores reviews
[ ] Frontend production build succeeds
✅ Current Project Status
Backend
Express server setup

MongoDB Atlas connection

User model

Movie model

Review model

JWT authentication

bcrypt password hashing

Registration API

Login API

Current-user API

Movie CRUD

Movie search

Movie sorting

Rating aggregation

Review create/update flow

One-review-per-user-per-movie constraint

Admin authorization

Request validation

Centralized error handling

Review rate limiting

Admin creation utility

Health endpoint

Frontend
React + Vite setup

React Router

Authentication context

Protected routes

Admin routes

Navbar

Movie cards

Movie grid

Search UI

Sorting UI

Interactive star rating

Movie details page

Review form

Review cards

Login page

Register page

Admin dashboard

Add movie page

Edit movie page

Responsive dark UI

API integration

Git / Project Setup
Root project structure

.gitignore

Separate frontend and backend packages

Environment-variable configuration

GitHub-ready structure

CI workflow planned

🚧 Remaining Work
Immediate Development
Fix and verify local Vite setup

Run frontend successfully on port 5173

Complete full local integration testing

Test registration and login end-to-end

Test admin movie CRUD

Test review workflow

Run frontend production build

Verify all environment variables

Verify no secrets are staged

Push final code to GitHub

🚀 AWS Deployment Plan
Final Planned Architecture
                         GitHub
                            │
                            │
                  ┌─────────┴─────────┐
                  │                   │
                  ▼                   ▼
             client/               server/
                  │                   │
                  ▼                   ▼
           AWS Amplify          Docker Image
                                      │
                                      ▼
                                 Amazon ECR
                                      │
                                      ▼
                              ECS Express Mode
                                      │
                                      ▼
                                HTTPS Backend
                                      │
                                      ▼
                               MongoDB Atlas
☁️ Frontend Deployment
Frontend deployment target:

AWS Amplify
Planned process:

GitHub
   ↓
AWS Amplify
   ↓
client/
   ↓
npm ci
   ↓
npm run build
   ↓
dist/
   ↓
Live React application
Required frontend environment variable:

VITE_API_URL=https://YOUR-BACKEND-URL/api
🐳 Backend Deployment
Backend deployment target:

Amazon ECS Express Mode
Planned process:

server/
   ↓
Docker
   ↓
Docker Image
   ↓
Amazon ECR
   ↓
ECS Express Mode
   ↓
HTTPS API
   ↓
MongoDB Atlas
Required backend environment variables:

MONGO_URI=
JWT_SECRET=
CLIENT_URL=
Secrets should be handled securely in production.

🔄 CI/CD
CineRate is designed to use:

GitHub Actions for CI

AWS Amplify for frontend CD

Amazon ECR + ECS Express Mode for backend deployment

Continuous Integration
Pull Request / Push
        ↓
GitHub Actions
        ↓
npm ci
        ↓
Frontend build
        ↓
Backend validation
        ↓
PASS / FAIL
Continuous Deployment
Push to main
      │
      ├──────────────► AWS Amplify
      │                    ↓
      │              Frontend deployment
      │
      └──────────────► Backend deployment
                           ↓
                      Amazon ECR
                           ↓
                   ECS Express Mode
                           ↓
                    Backend deployment
📦 CI Workflow
The planned GitHub Actions workflow:

.github/
└── workflows/
    └── ci.yml
Its responsibilities include:

Installing frontend dependencies

Building the frontend

Installing backend dependencies

Checking backend syntax

Running automated validation

🎯 Deployment Roadmap
Phase 1  ████████████████████  Backend Development
Phase 2  ████████████████████  Frontend Development
Phase 3  ██████████░░░░░░░░░░  Local Integration
Phase 4  ░░░░░░░░░░░░░░░░░░░░  GitHub
Phase 5  ░░░░░░░░░░░░░░░░░░░░  Docker + ECR
Phase 6  ░░░░░░░░░░░░░░░░░░░░  ECS Deployment
Phase 7  ░░░░░░░░░░░░░░░░░░░░  Amplify Deployment
Phase 8  ░░░░░░░░░░░░░░░░░░░░  CI/CD Verification
Phase 9  ░░░░░░░░░░░░░░░░░░░░  Production Hardening
🧰 Technology Stack
Layer	Technology
Frontend	React
Build Tool	Vite
Routing	React Router
Styling	CSS
Backend	Node.js
API	Express.js
Database	MongoDB Atlas
ODM	Mongoose
Authentication	JWT
Password Security	bcrypt
Security Headers	Helmet
CORS	Express CORS
Rate Limiting	express-rate-limit
Source Control	Git + GitHub
CI	GitHub Actions
Frontend Deployment	AWS Amplify
Containerization	Docker
Container Registry	Amazon ECR
Backend Deployment	Amazon ECS Express Mode
Database Hosting	MongoDB Atlas
🔐 Environment Variables
Backend
MONGO_URI=
JWT_SECRET=
CLIENT_URL=
Frontend
VITE_API_URL=
Never commit real secrets to GitHub.

🔮 Future Improvements
Planned or possible future enhancements include:

Movie genres and categories

Pagination

User profiles

Follow/follower system

Like/helpful reactions on reviews

Review sorting

Advanced filtering

Movie trailers

TMDB API integration

Watchlist

Personalized movie recommendations

Recommendation engine

Admin analytics dashboard

Image upload support

Automated unit tests

Automated integration tests

Redis caching

More advanced CI/CD deployment gates

Monitoring and logging

Custom domain

🧠 Engineering Focus
CineRate is being developed around the following principles:

Clean Architecture
        +
Reusable Components
        +
RESTful APIs
        +
Secure Authentication
        +
Server-Side Validation
        +
Role-Based Authorization
        +
Cloud Deployment
        +
CI/CD
The objective is to demonstrate a complete software engineering workflow:

Idea
 ↓
Architecture
 ↓
Backend
 ↓
Frontend
 ↓
Database
 ↓
Authentication
 ↓
Testing
 ↓
GitHub
 ↓
CI/CD
 ↓
Cloud Deployment
 ↓
Production
📈 Current Development State
Backend           ✅ Complete
Database          ✅ Connected
Authentication    ✅ Implemented
Admin System      ✅ Implemented
Reviews           ✅ Implemented
Frontend          ✅ Implemented
Local Integration 🔄 In Progress
GitHub            🔄 In Progress
Docker             ⏳ Pending
ECR                ⏳ Pending
ECS                ⏳ Pending
Amplify            ⏳ Pending
CI/CD              🔄 Planned / In Progress
Production        ⏳ Pending
👨‍💻 Project
CineRate is a personal full-stack portfolio project focused on demonstrating practical experience with:

Full-stack development

REST API design

Authentication and authorization

MongoDB data modeling

React application architecture

Cloud deployment

Docker

CI/CD

AWS
