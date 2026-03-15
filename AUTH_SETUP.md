# Student Help Desk - Authentication Setup Guide

## Overview
This project uses JWT-based authentication with bcrypt password hashing and MongoDB for user storage.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/student-helpdesk

# JWT Secret (use a strong random string)
JWT_SECRET=your-super-secret-key-change-in-production

# Gemini API Key (for chatbot)
GEMINI_API_KEY=your-gemini-api-key

# Node Environment
NODE_ENV=development
```

## Database Setup

### Using MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/database-name`
4. Add to `.env.local` as `MONGODB_URI`

### Using Local MongoDB
```bash
# Install MongoDB locally and run
mongod

# Connection string:
MONGODB_URI=mongodb://localhost:27017/student-helpdesk
```

## Seeding Test Users

Run the seed script to add test users to the database:

```bash
npm run seed
```

This creates:
- **Student Account**: student@example.com / student123
- **Admin Account**: admin@example.com / admin123

## User Schema

```typescript
{
  email: string (unique, required)
  password: string (hashed with bcrypt)
  role: "STUDENT" | "ADMIN"
  name: string (optional)
  createdAt: Date
  updatedAt: Date
}
```

## Login Flow

1. User selects Student or Admin tab
2. Submits email and password
3. Backend validates credentials against role
4. JWT token generated and stored in HTTP-only cookie
5. User redirected to appropriate dashboard

## API Endpoints

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "role": "STUDENT" | "ADMIN"
}

Response:
{
  "message": "Login successful",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "role": "STUDENT",
    "name": "User Name"
  }
}
```

### Logout
```
POST /api/auth/logout

Response:
{
  "message": "Logged out successfully"
}
```

## Protected Routes

- `/` - Student Dashboard (requires STUDENT role)
- `/chatbot` - AI Chatbot (requires STUDENT role)
- `/create-ticket` - Create Ticket (requires STUDENT role)
- `/my-tickets` - My Tickets (requires STUDENT role)
- `/admin` - Admin Dashboard (requires ADMIN role)
- `/login` - Public (redirects to dashboard if already logged in)

## JWT Token

Tokens include:
- `userId`: User's MongoDB ID
- `email`: User's email
- `role`: User's role (STUDENT or ADMIN)
- `exp`: Expiration time (7 days)

Tokens are stored in HTTP-only cookies and automatically sent with requests.

## Security

- Passwords are hashed using bcrypt (10 salt rounds)
- JWT tokens expire after 7 days
- HTTP-only cookies prevent XSS attacks
- Middleware validates tokens on protected routes
- Role-based access control prevents unauthorized access
