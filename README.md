# DayFlow HRMS

DayFlow is a human resource management system built for employee self-service and HR operations. The application provides employee dashboards, attendance tracking, leave requests, payroll access, and administrative management workflows in a single web experience.

## Features
- Employee login and secure authentication
- Employee dashboard with overview cards and quick status summaries
- Profile management for personal and contact details
- Attendance check-in/check-out tracking
- Leave request submission and status tracking
- Payroll and payslip overview
- HR dashboard for attendance and payroll oversight
- Protected routes based on user role and session state

## Tech Stack
- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Spring Boot + Java + Maven
- Database: MySQL
- Authentication: JWT + BCrypt password hashing
- API integration: Axios with API client and bearer-token auth

## Project Structure
- `src/` — frontend application and UI pages
- `src/pages/` — auth, employee, and admin pages
- `src/services/api/` — API and auth service layer
- `src/routes/` — route guards and route configuration
- `backend/` — Spring Boot backend application
- `backend/src/main/java/com/dayflow/backend/` — Java controllers, services, repositories, and entities
- `backend/src/main/resources/application.properties` — backend datasource and app config

## Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Frontend runs on:
   ```text
   http://localhost:5173
   ```

## Backend Setup
1. Go to the backend folder:
   ```bash
   cd backend
   ```
2. Build and run the Spring Boot app:
   ```bash
   ./mvnw spring-boot:run
   ```
   On Windows:
   ```bash
   mvnw.cmd spring-boot:run
   ```
3. Backend runs on:
   ```text
   http://localhost:8080
   ```

## Environment Notes
- The frontend expects the backend at `http://localhost:8080/api`.
- The backend is configured for MySQL and expects the existing `dayflow` database.
- Authentication is managed via JWT and persisted locally in the browser session storage/auth state.

## Demo Notes
DayFlow is designed as a hackathon-ready HRMS prototype with employee self-service and HR operations workflows. The application is intended to run with the backend services up and connected to the configured MySQL instance.
