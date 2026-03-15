<<<<<<< HEAD
# 🎓 Student Help Desk Portal

An AI-powered **Student Help Desk System** built to simplify how students raise issues and how administrators manage and resolve them efficiently.

This project was developed for a **Hackathon** and focuses on providing a smooth ticket-based support system with an admin management panel and AI assistance.

---

# 🚀 Features

## 👨‍🎓 Student Features

* Student login system
* Create support tickets
* View all submitted tickets
* Track ticket status
* Chat with AI assistant for quick help

## 🛠 Admin Features

* Secure admin login
* Admin dashboard
* View all student tickets
* Update ticket status
* Reply to student queries
* Manage support workflow

---

# 🧠 AI Integration

The system includes an **AI Chatbot** that helps students by answering common queries before creating a support ticket.

This reduces unnecessary tickets and speeds up support resolution.

---

# 🧱 Tech Stack

### Frontend

* **Next.js (App Router)**
* **React**
* **Tailwind CSS**
* **Lucide Icons**

### Backend

* **Next.js API Routes**
* **Node.js**

### Database

* **MongoDB Atlas**

### Authentication

* **bcryptjs** for password hashing

---

# 📁 Project Structure

```
mmmut-helpdesk
│
├── app
│   ├── admin
│   │   ├── page.tsx
│   │   └── tickets
│   │       ├── page.tsx
│   │       └── [id]/page.tsx
│   │
│   ├── api
│   │   └── auth
│   │       └── login
│   │           └── route.ts
│   │
│   ├── chatbot
│   ├── create-ticket
│   ├── login
│   ├── my-tickets
│   ├── tickets
│   │   └── [id]
│   │
│   └── page.tsx
│
├── components
│   ├── sidebar.tsx
│   ├── login-form.tsx
│   ├── navbar.tsx
│   ├── ticket-summary.tsx
│   └── chat-window.tsx
│
├── lib
│   └── db.ts
│
├── data
│   └── tickets.json
│
├── scripts
│   └── hash-password.js
│
└── .env.local
```

---

# 🔐 Authentication Flow

### Admin Login

1. User selects **Admin** on login page
2. Credentials sent to:

```
POST /api/auth/login
```

3. Backend checks **admins collection**
4. Password verified using **bcrypt**
5. Admin redirected to:

```
/admin
```

---

### Student Login

1. User selects **Student**
2. Credentials checked in:

```
users collection
```

3. Student redirected to:

```
/dashboard
```

---

# 🗄 Database Structure

### admins collection

```
{
  "email": "admin@mmmut.edu",
  "password": "<bcrypt hashed password>",
  "role": "admin"
}
```

---

### users collection

```
{
  "email": "student@mmmut.edu",
  "password": "<bcrypt hashed password>",
  "role": "student"
}
```

---

# 🔑 Generate Hashed Password

Run in terminal:

```
node scripts/hash-password.js admin123
```

Output example:

```
$2b$10$Uk.CNc.9egXg8tRBKX1KyeuEnZDJP8jXE.oR2XWWo7p.egBJjBG.S
```

Use this value in MongoDB.

---

# ⚙ Environment Variables

Create `.env.local`

```
MONGODB_URI=your_mongodb_connection_string
```

Example:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mmmut-helpdesk
```

---

# ▶ Running the Project

### Install dependencies

```
npm install
```

### Start development server

```
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

# 📊 Admin Panel

Admin dashboard allows administrators to:

* View all tickets
* Update ticket status
* Respond to student messages
* Monitor support requests

---

# 🎯 Future Improvements

* Ticket priority automation
* Email notifications
* AI auto-reply suggestions
* Ticket analytics dashboard
* Role-based authentication
* Real-time chat support

---

# 🏆 Hackathon Goal

The aim of this project is to build a **modern AI-powered help desk system** that:

* Reduces response time
* Improves issue tracking
* Automates student support
* Provides a scalable ticket management system

---

# 👨‍💻 Author

**Anand Pratap Singh**

---

# ⭐ If you like this project

Give it a ⭐ on GitHub!
=======
# mmmut-helpdesk
A modern Student Help Desk Portal designed to streamline campus support services using an AI-powered chatbot, structured ticketing system, and an admin dashboard. Built for a college hackathon, this project focuses on real-world usability, human-centric UI, and scalable architecture rather than a “boxy AI demo”.
>>>>>>> 29fa9d77bcf47175d6250f61d9d1c18c80ccb85e
