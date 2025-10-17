# Student_Management_System
Student Management System is a full-stack web app built with Spring Boot, React.js, and MySQL. It includes JWT authentication, role-based access, and CRUD operations for students, branches, and admins, with form validations and a Top Performer module for efficient and secure data management.

## 🚀 Features

### 👨‍💼 Admin
- Secure login using JWT authentication
- Add / Edit / Delete / View students
- Manage branches and user roles
- View top performers

### 🎓 Student
- Login using JWT authentication
- View & update personal profile
- View assigned branch and role
- View academic performance

### ⚙️ Common Features
- Role-based access control
- Form validations for all modules
- CRUD operations with RESTful APIs
- Responsive UI with React & Bootstrap

## 🧱 Tech Stack
**Frontend:** HTML, CSS, Javascript, React JS, Axios, Bootstrap  
**Backend:** Java, Spring Boot, Spring Data JPA, Spring Security (JWT)  
**Database:** MySQL  
**Tools:** Postman, Spring Tool Suite, VS Code  

## 🧩 Project Structure

StudentManagementSystem/
|---backend/ → Spring Boot Application
|---frontend/ → React Application


## 🧰 Installation & Setup

### 🔹 Backend Setup
1. Go to the backend folder:
- cd Student_Management_System_Backend
   
2. Configure your MySQL Database in application.properties:
- spring.datasource.url=jdbc:mysql://localhost:3306/student_db
- spring.datasource.username=root
- spring.datasource.password=yourpassword

4. Run the backend 
- Run as Spring boot app

### 🔹 Frontend Setup
1. Go to the frontend folder:
- cd Student_Management_System_Frontend

2. Install dependencies:
- npm install

3. Run the frontend
- npm run dev


