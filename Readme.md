# 🎓 Courser - Advanced Course Selling Platform

Courser is a comprehensive Full-Stack web application that empowers instructors to sell courses and students to learn seamlessly. It features a robust admin dashboard, secure payments, and a fluid video learning experience.

## 🚀 Key Features

### 👤 For Students
- **Course Discovery:** Search bar to find courses by title or keywords.
- **Categorized Browsing:** Filter courses by categories (e.g., Development, Business, Design).
- **Video Player:** Integrated video streaming for a high-quality learning experience.
- **Purchase System:** Securely buy courses and add them to your library.
- **User Authentication:** Secure Signup/Login using JWT.

### 🛡️ For Admins
- **Course Management:** Add, Update, and Delete courses (Full CRUD).
- **Video Hosting:** Upload and link video content for lessons.
- **Admin Dashboard:** Overview of all listed courses and sales.

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS (Responsive Design)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Cloud)
- **Auth:** JSON Web Tokens (JWT) & Bcrypt
- **State Management:** React Hooks / Context API

## 📁 Project Structure

```text
Course Selling app/
├── backend/           # Node.js API & Database Logic
│   ├── models/        # Schemas for Users, Admins, & Courses
│   ├── routes/        # API Endpoints
│   └── .env           # Environment Variables (Private)
├── frontend/          # React App (UI & UX)
│   ├── src/components # Reusable UI components
│   └── src/pages      # Search, Home, & Video Player pages
└── README.md          # Project Documentation