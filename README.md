# 🔐 Login & Signup Authentication System

A full-stack (beginner) authentication system built with Node.js, Express, MongoDB, JWT, and React (Vite).  
This project implements secure user registration, login, authentication, and logout using JWT stored in HTTP-only cookies.

---

## 🚀 Features

- User Signup with password hashing (bcrypt)
- User Login with JWT authentication
- Secure Logout
- Protected routes using middleware
- JWT stored in HTTP-only cookies
- MongoDB database integration
- Frontend built with React + Axios
- Clean MVC project structure

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- cookie-parser
- dotenv

### Frontend
- React (Vite)
- Axios
- React Router DOM

---

## 📁 Project Structure

Login-SignUp-with-Authentication/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── api/
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md

---

## ⚙️ Environment Variables

Create a `.env` file in the backend folder:

PORT=3000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  
NODE_ENV=development  

---

## ▶️ Getting Started

### Clone the Repository

git clone https://github.com/youngtalent18/Login-SignUp-with-Authentication.git  
cd Login-SignUp-with-Authentication

---

### Install Dependencies

Backend:

cd backend  
npm install  

Frontend:

cd frontend  
npm install  

---

### Run the Application

Start Backend:

npm run dev  

Start Frontend:

npm run dev  

Frontend URL:  
http://localhost:5173  

Backend URL:  
http://localhost:3000  

---

## 🔑 Authentication Flow

1. User signs up and password is hashed
2. JWT is generated and stored in an HTTP-only cookie
3. Protected routes use authentication middleware
4. Logout clears the JWT cookie
5. Unauthorized users cannot access protected routes

---

## 🧪 API Routes

POST   /api/auth/signup  
POST   /api/auth/login  
POST   /api/auth/logout  
GET    /api/auth/me  

---

## 🔒 Security Measures

- Password hashing using bcrypt
- JWT stored in HTTP-only cookies
- CSRF protection using sameSite strict
- Protected routes with JWT verification
- Password field excluded from responses

---

## 📌 Future Improvements

- Email verification
- Password reset
- Refresh tokens
- User roles (admin/user)
- Improved frontend validation
- UI enhancements

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Anti Stephen Papa Kyei  
GitHub: https://github.com/youngtalent18
