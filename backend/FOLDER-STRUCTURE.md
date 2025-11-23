

# 📁 **FOLDER_STRUCTURE.md**

```markdown
# 📁 Project Folder Structure Documentation

This document describes the recommended folder structure for the  
**College Digital Platform Backend (Node.js + Express + Sequelize + MySQL)**.

The structure follows clean-architecture principles:

- Separation of concerns  
- Scalable for features such as Albums, Feed, Groups, Users  
- Follows MVC pattern  
- Organized for large production systems

---

# 📦 1. Folder Structure Overview

```

backend/
│── node_modules/
│
│── config/
│   ├── dbConfig.js
│   ├── sequelize.js
│   ├── logger.js
│   └── cloudStorage.js
│
│── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── album.controller.js
│   ├── media.controller.js
│   ├── group.controller.js
│   ├── post.controller.js
│   └── comment.controller.js
│
│── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   ├── errorHandler.js
│   └── upload.middleware.js
│
│── models/
│   ├── index.js
│   ├── user.js
│   ├── album.js
│   ├── media.js
│   ├── group.js
│   ├── post.js
│   ├── comment.js
│   └── parentStudent.js
│
│── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── album.routes.js
│   ├── media.routes.js
│   ├── group.routes.js
│   ├── post.routes.js
│   └── comment.routes.js
│
│── services/
│   ├── auth.service.js
│   ├── user.service.js
│   ├── album.service.js
│   ├── media.service.js
│   ├── group.service.js
│   ├── post.service.js
│   └── notification.service.js
│
│── utils/
│   ├── jwt.js
│   ├── bcrypt.js
│   ├── uploader.js
│   ├── response.js
│   └── email.js
│
│── validations/
│   ├── auth.validation.js
│   ├── user.validation.js
│   ├── album.validation.js
│   └── comment.validation.js
│
│── uploads/        (optional local storage)
│
│── logs/
│   └── app.log
│
│── .env
│── server.js
│── package.json
│── README.md
│── PROJECT_SETUP.md
│── PROJECT_FLOW_JWT_AUTH.md
│── FOLDER_STRUCTURE.md   ← (this file)

```

---

# 📚 2. Explanation of Each Folder

## 📁 **config/**
Configuration and reusable setup files.

| File | Purpose |
|------|---------|
| dbConfig.js | Reads DB details from `.env` |
| sequelize.js | Sequelize instance + auto DB create |
| logger.js | Winston or similar logging setup |
| cloudStorage.js | AWS S3 / GCP / Azure configurations |

---

## 📁 **controllers/**
Handles HTTP request → response.

Example:  
`user.controller.js` handles:

- create user  
- update user  
- get users  
- delete user  

Controllers **never** handle business logic.

---

## 📁 **middleware/**
Reusable request middlewares.

| Middleware | Purpose |
|-----------|----------|
| authMiddleware | Verifies JWT tokens |
| roleMiddleware | Restricts access based on roles |
| errorHandler | Centralized error responses |
| upload.middleware | Multer configuration for photo/video upload |

---

## 📁 **models/**
Sequelize ORM models + associations.

| Model | Purpose |
|-------|---------|
| user.js | Student, Parent, HOD, Principal |
| album.js | Photo/video album |
| media.js | Each photo/video record |
| group.js | Batches/years |
| post.js | Feed posts |
| comment.js | Comments on posts |
| parentStudent.js | Mapping for Parent ↔ Student |

`index.js` loads all models and sets associations.

---

## 📁 **routes/**
Each file maps routes → controller functions.

Example:  
`auth.routes.js`:

```

POST /auth/register
POST /auth/login
GET  /auth/me

```

---

## 📁 **services/**
Contains **business logic** (application core).

| Service | Responsibility |
|---------|----------------|
| auth.service.js | Login, register, token creation |
| user.service.js | Manage users, approvals, parents |
| album.service.js | Album CRUD |
| media.service.js | Photo/video upload/delete |
| group.service.js | Batch/year management |
| post.service.js | Feed posts |
| notification.service.js | Email/SMS/in-app notifications |

Controllers call services → services talk to DB.

---

## 📁 **utils/**
Helper functions.

| File | Description |
|------|-------------|
| jwt.js | Generate + verify JWT tokens |
| bcrypt.js | Hash + compare passwords |
| uploader.js | S3 upload helpers |
| response.js | Standard API response format |
| email.js | Nodemailer or SendGrid |

---

## 📁 **validations/**
Request validation using Joi/Yup.

Example:

```

auth.validation.js

```

Validates registration/login schemas.

---

## 📁 **uploads/**
Only used if storing media locally (not recommended for production).

---

## 📁 **logs/**
Application logs.

---

## 📄 Other Root Files

| File | Purpose |
|------|---------|
| server.js | App entry point |
| .env | Application secrets |
| README.md | Project introduction |
| PROJECT_SETUP.md | Setup + testing guide |
| PROJECT_FLOW_JWT_AUTH.md | JWT flow documentation |

---

# 🧩 3. High-Level Architecture Diagram (Text-Based)

```

Client → Routes → Controllers → Services → Models → MySQL
↑
Middlewares

```

---

# 🏁 4. Benefits of This Structure

✔ Scalable for large project  
✔ Easy to maintain  
✔ Clear separation of concerns  
✔ Industry-standard architecture  
✔ Perfect for team development  
✔ Clean for microservices transition  

---
