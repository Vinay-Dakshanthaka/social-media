# 📄 **1️⃣ PROJECT_SETUP.md (Project Setup + How to Run + API Testing Guide)**

```markdown
# 🚀 Project Setup & API Testing Guide

This document explains how to **set up**, **run**, and **test** the backend Node.js + Express + Sequelize + MySQL project.

---

# 📦 1. Prerequisites

Before starting, install:

- **Node.js** (v16+)
- **MySQL Server** (running locally)
- **Postman** (for API testing)

---

# 🔧 2. Configure Environment Variables

Create a `.env` file in the project root:

```

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=college_platform
DB_DIALECT=mysql
JWT_SECRET=ANY_RANDOM_STRING(FOR DEVELOMENT)

```

---

# 🏗️ 3. Install Dependencies

Run:

```

npm install

```

This installs:

- Express
- Sequelize
- MySQL2
- Bcrypt
- JsonWebToken
- Dotenv
- CORS

---

# 🗄️ 4. Start MySQL & Create Database Automatically

The project auto-creates the database.

Just run:

```

npm start

```

Expected:

```

Database created or already exists
Server is running on port 5000

```

---

# 🔥 5. How to Test APIs (Postman)

Base URL:

```

[http://localhost:5000/api](http://localhost:5000/api)

````

---

## 🧪 **STEP 1 — Register User**
**POST** `/auth/register`

### Body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@mail.com",
  "password": "password123",
  "phone": "9999999999"
}
````

---

## 🧪 **STEP 2 — Login User**

**POST** `/auth/login`

### Response:

You will receive:

```json
{
  "token": "YOUR_JWT_HERE",
  "user": { ... }
}
```

Copy the token.

---

## 🧪 **STEP 3 — Get Profile (JWT Protected)**

**GET** `/auth/me`

### Headers:

```
Authorization: Bearer <your_token_here>
```

---

## 🧪 **STEP 4 — Create User (Admin Creates Student/Parent)**

**POST** `/users` (Requires JWT)

### Headers:

```
Authorization: Bearer <token>
```

### Body:

```json
{
  "firstName": "New",
  "lastName": "Student",
  "email": "student@mail.com",
  "role": "STUDENT",
  "password": "password123"
}
```

---

## 🧪 **STEP 5 — Get Users**

**GET** `/users`

### Headers:

```
Authorization: Bearer <token>
```

---

## 🧪 **STEP 6 — Get Single User**

**GET** `/users/:id`

---

# 🎉 Done!

Your backend is running and ready for integration with frontend (React/Angular).

````

---

# 📄 **2️⃣ PROJECT_FLOW_JWT_AUTH.md (JWT Auth & Role-Based Flow Guide)**

```markdown
# 🔐 Project Flow – JWT Authentication & Role-Based Access

This document explains how authentication, authorization, and user roles work inside the backend.

---

# 🧩 1. User Roles in the System

| Role | Description |
|------|-------------|
| **PRINCIPAL** | Super-admin-like role. Full access. |
| **HOD** | Department admin. Manages albums, students, groups. |
| **ADMIN** | (Optional) Similar to HOD. |
| **STUDENT** | Can view assigned groups, albums, feed, interact (like/comment). |
| **PARENT** | Can view content allowed for their child. |

Roles are stored in the `users` table:

````

role ENUM('PRINCIPAL','HOD','ADMIN','STUDENT','PARENT')

````

---

# 🔐 2. JWT Authentication Flow

## ✔ Step 1 — User Registers
- User submits **email + password**.
- Password is hashed using **bcrypt**.
- User stored in DB.

---

## ✔ Step 2 — User Login
- User provides **email + password**.
- Backend verifies:
  - User exists
  - Password matches
  - User is **approved** (future feature)
- If valid → backend generates JWT:

```json
{
  "id": 1,
  "email": "user@mail.com",
  "role": "STUDENT"
}
````

JWT is signed using:

```
JWT_SECRET
```

---

## ✔ Step 3 — Using JWT for Protected Routes

Every protected request must include:

```
Authorization: Bearer <token>
```

Middleware extracts, verifies JWT, and attaches:

```
req.user = { id, email, role }
```

---

# 🔒 3. Role-Based Access Control (RBAC)

Middleware example:

```
allowRoles('PRINCIPAL', 'HOD')
```

Used for:

* Creating albums
* Managing students/parents
* Approving users
* Managing feed
* Viewing analytics

### Student/Parent Permissions:

* View only content allowed for their group.
* Like/comment.
* Cannot manage albums or groups.

---

# 📚 4. DB Model Relationships (High-Level Overview)

### Users

* One user can create many albums
* One student may link to parents
* One user can upload many media files
* One user can like/comment many posts

### Albums

* Created by: Admin
* Contains many photos/videos

### Groups

* Students belong to groups
* Posts/albums can be restricted to groups

### Posts

* Can contain text, images, videos
* Students/parents can like/comment

---

# 🔄 5. Authentication Lifecycle Summary

1️⃣ **Register**
2️⃣ **Login → JWT issued**
3️⃣ **Client stores token (localStorage, mobile secure storage)**
4️⃣ **Client sends token with every request**
5️⃣ **Backend verifies token**
6️⃣ **Role-based access applied**
7️⃣ **User allowed/denied**

---

# 🏁 Conclusion

Your project uses:

* **JWT Authentication**
* **Sequelize ORM**
* **MySQL**
* **Role-based Authorization**
* **User → Parent/Student → Group relationships**
* **Secure feed + album access**

This ensures a fully private, controlled college digital ecosystem.

```

---

