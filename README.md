# Library Management System

A full-stack Library Management System for managing users, books, borrowing, returns, authentication, and admin workflows. The project is built with a React frontend, Redux Toolkit state management, an Express backend, MongoDB/Mongoose data models, JWT cookie authentication, and email-based account/password flows.

## What This Project Does

This application helps a library manage its daily operations digitally. Users can create accounts, verify their email, log in, browse available books, and view their borrowed books. Admin users can manage the library catalog, view users, create new admins, record borrowed books, and process returns.

The system keeps track of book quantity, availability, borrowing dates, due dates, return dates, and late fines. It also includes password recovery and password update features so users can manage account access safely.

## Main Features

- User registration with email OTP verification.
- Secure login and logout using JWT stored in cookies.
- Password forgot, reset, and update flows.
- Role-based access for `User` and `Admin`.
- Admin dashboard for library operations.
- User dashboard for personal borrowing activity.
- Book catalog with availability tracking.
- Add, list, and delete books.
- Record book borrowing for a user.
- Return borrowed books and calculate late fines.
- View borrowed book records.
- View registered users.
- Add new admin accounts.
- Toast notifications on frontend actions.

## User Roles

### User

A regular user can:

- Register and verify the account with OTP.
- Log in and log out.
- Browse the catalog.
- View personal borrowed books.
- Return borrowed books where allowed by the workflow.
- Reset or update the account password.

### Admin

An admin can:

- Access admin dashboard features.
- Add new books to the library.
- Delete books from the catalog.
- View all users.
- Add another admin.
- Record a borrowed book for a user by email.
- View all borrowed book records.
- Process book returns.

## How Borrowing Works

1. An admin selects or records a book borrow action for a user.
2. The system checks that the book exists and has available quantity.
3. The system checks that the user exists.
4. The book quantity is reduced by one.
5. A borrowed book entry is added to the user account.
6. A borrow record is created with borrow date, due date, price, and return status.
7. The due date is currently set to 7 days after borrowing.

## How Returns and Fines Work

1. A return request is made with the user email and book ID.
2. The system checks that the user borrowed the book and has not already returned it.
3. The borrowed item is marked as returned.
4. The book quantity is increased by one.
5. The borrow record receives a return date.
6. If the book is overdue, a fine is calculated.

Fine calculation currently uses:

```text
0.1 currency units per late hour
```

## Tech Stack

### Frontend

- React 18
- Vite
- React Router
- Redux Toolkit
- React Redux
- Axios
- Tailwind CSS
- React Toastify
- Chart.js and React Chart.js
- Lucide React and React Icons

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication
- Bcrypt password hashing
- Cookie Parser
- CORS
- Nodemailer
- Cloudinary configuration
- Express File Upload

## Project Structure

```text
library management system/
  client/
    src/
      components/      Main dashboard and catalog components
      layout/          Header and sidebar layout
      pages/           Login, register, OTP, home, password pages
      popups/          Add book, return book, settings, admin popups
      store/           Redux store and slices
  server/
    config/            Environment configuration
    controllers/       Request handlers
    database/          MongoDB connection
    middleware/        Auth, error handling, async handling
    models/            Mongoose schemas
    routes/            API routes
    utils/             Email, token, fine, and template helpers
```

## Important Frontend Pages

- `/` - Home page and dashboard entry.
- `/login` - User login.
- `/register` - New user registration.
- `/otp-verification/:email` - OTP verification page.
- `/password/forgot` - Forgot password page.
- `/password/reset/:token` - Reset password page.

## Backend API Overview

Base API path:

```text
http://localhost:5000/api/v1
```

If your backend uses a different port, update the frontend API URLs or set the backend `PORT` to match.

### Auth Routes

```text
POST /auth/register
POST /auth/verify-otp
POST /auth/login
GET  /auth/logout
GET  /auth/me
POST /auth/password/forgot
PUT  /auth/password/reset/:token
PUT  /auth/password/update
```

### Book Routes

```text
POST   /book/admin/add
GET    /book/all
DELETE /book/delete/:id
```

### Borrow Routes

```text
POST /borrow/record-borrow-book/:id
GET  /borrow/borrowed-books-by-users
GET  /borrow/my-borrowed-books
PUT  /borrow/return-borrowed-book/:bookId
```

### User Routes

```text
GET  /user/all
POST /user/add/new-admin
```

## Data Models

### User

Stores:

- Name
- Email
- Hashed password
- Role: `Admin` or `User`
- Account verification status
- Borrowed books
- Profile metadata
- OTP verification code and expiry
- Password reset token and expiry
- Created and updated timestamps

### Book

Stores:

- Title
- Author
- Description
- Price
- Quantity
- Availability status
- Created and updated timestamps

### Borrow

Stores:

- Borrowing user details
- Book reference
- Book price
- Borrow date
- Due date
- Return date
- Fine
- Notification status
- Created and updated timestamps

## Environment Variables

Create or update the backend environment file:

```text
server/config/config.env
```

Required variables:

```text
PORT=5000
FRONTEND_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
SMTP_HOST=your_smtp_host
SMTP_SERVICE=your_smtp_service
SMTP_PORT=your_smtp_port
SMTP_MAIL=your_smtp_email
SMTP_PASSWORD=your_smtp_password
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRE=4d
COOKIE_EXPIRE=3
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Do not commit real passwords, database URLs, JWT secrets, SMTP credentials, or Cloudinary secrets to a public repository.

## Installation

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd client
npm install
```

## Running the Project

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

Open the frontend:

```text
http://localhost:5173
```

The backend should be available at:

```text
http://localhost:5000
```

## Build and Checks

Build the frontend:

```bash
cd client
npm run build
```

Run frontend linting:

```bash
cd client
npm run lint
```

## Typical Workflow

1. A user registers with name, email, and password.
2. The user receives an OTP by email.
3. The user verifies the OTP and becomes authenticated.
4. The user can browse books and view borrowing details.
5. An admin can add books and manage inventory.
6. An admin records a borrow action when a user borrows a book.
7. The system tracks due date and availability.
8. When the book is returned, the system updates inventory and calculates any fine.

## Security Notes

- Passwords are hashed using bcrypt.
- Authentication uses JWT tokens sent through cookies.
- Protected routes require authentication.
- Admin-only routes use role authorization.
- OTP codes expire after a limited time.
- Password reset tokens are hashed before storage.

## Current Notes for Developers

- Frontend API calls currently target `http://localhost:5000/api/v1`.
- Make sure the backend port and frontend API base URL match.
- The backend reads environment variables from `server/config/config.env`.
- MongoDB must be reachable before starting the backend.
- Email flows require working SMTP settings.

## Summary

This project is designed to digitize library operations for both readers and administrators. It handles account creation, verification, book catalog management, borrowing records, returns, late fines, and user administration in one connected system.
