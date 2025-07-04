# User Management Dashboard

A full-stack web application for managing users with CRUD operations, built with Next.js frontend and Firebase Functions backend.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running with Docker](#running-with-docker)
- [API Documentation](#api-documentation)
- [CRUD Operations Guide](#crud-operations-guide)
- [Environment Variables](#environment-variables)


## ✨ Features

- **Full CRUD Operations**: Create, Read, Update, Delete users
- **Modern UI**: Clean and responsive design with Tailwind CSS and shadcn/ui components
- **Real-time Updates**: Instant UI updates after operations
- **Form Validation**: Client-side validation for user inputs
- **Error Handling**: Comprehensive error handling with user-friendly alerts
- **Loading States**: Loading indicators for better UX
- **Responsive Design**: Mobile-friendly interface
- **TypeScript**: Full type safety across the application

## 🛠 Tech Stack

### Frontend
- **Next.js 15.3.4** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **class-variance-authority** - Component variants

### Backend
- **Firebase Functions** - Serverless functions
- **Firebase Firestore** - NoSQL database
- **Node.js** - Runtime environment
- **CORS** - Cross-origin resource sharing

### DevOps 
- **Docker** - Containerization
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📁 Project Structure

```
assignment-frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── userForm.tsx      # User creation/editing form
│   │   │   └── userTable.tsx     # User data table
│   │   ├── pages/
│   │   │   └── index.tsx         # Main dashboard page
│   │   ├── services/
│   │   │   └── userService.ts    # API service layer
│   │   ├── types/
│   │   │   └── user.ts           # TypeScript interfaces
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # App layout
│   │   └── page.tsx              # Home page
│   └── components/
│       └── ui/                   # Reusable UI components
│           ├── button.tsx
│           ├── input.tsx
│           ├── table.tsx
│           └── alert.tsx
├── public/                       # Static assets
├── Dockerfile                    # Docker configuration
├── package.json                  # Dependencies
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── next.config.ts               # Next.js configuration

backend/
├── functions/
│   ├── src/
│   │   └── index.ts             # Firebase Functions
│   ├── package.json
│   └── tsconfig.json
├── firebase.json                # Firebase configuration
└── firestore.rules             # Firestore security rules
```

## 📋 Prerequisites

- Node.js 18+ and npm
- Docker (for containerization)
- Firebase CLI (for backend deployment)
- Git

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Assign-pric
```

### 2. Frontend Setup
```bash
cd assignment-frontend
npm install
```

### 3. Backend Setup
```bash
cd ../backend/functions
npm install
```

### 4. Environment Variables
Create a `.env.local` file in the `assignment-frontend` directory:
```env
# API Endpoints
NEXT_PUBLIC_GET_USERS_URL=https://getusers-{your_id}.a.run.app
NEXT_PUBLIC_GET_USER_BY_ID_URL=https://getuserbyid-{your_id}.a.run.app
NEXT_PUBLIC_CREATE_USER_URL=https://createuser-{your_id}.a.run.app
NEXT_PUBLIC_UPDATE_USER_URL=https://updateuser-{your_id}.a.run.app
NEXT_PUBLIC_DELETE_USER_URL=https://deleteuser-{your_id}.a.run.app

```

### 5. Run the Application
```bash
# Frontend (from assignment-frontend directory)
npm run dev

# Backend (deploy to Firebase)
cd ../backend
firebase deploy --only functions
```

The application will be available at `http://localhost:3000`.

## 🐳 Running with Docker

### 1. Build the Docker Image
```bash
cd assignment-frontend
docker build -t user-management-app .
```

### 2. Run the Container
```bash
docker run -p 3000:3000 user-management-app
```

### 3. Access the Application
Open your browser and navigate to `http://localhost:3000`

### Docker Compose (Optional)
Create a `docker-compose.yml` file in the root directory:
```yaml
version: '3.8'
services:
  frontend:
    build: ./assignment-frontend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

Run with:
```bash
docker-compose up
```

## 📚 API Documentation

### Base URL
All API endpoints are hosted on Google Cloud Run:
- Base URL: `https://[function-name]-eljsamlcia-uc.a.run.app`

### Endpoints

#### 1. Get All Users
- **URL**: `GET /getusers`
```json
[
  {
    "id": "user123",
    "name": "Pranav",
    "email": "test@email.com",
    "age": 30,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

#### 2. Get User by ID
- **URL**: `GET /getuserbyid?id={userId}`
- **Response**:
```json
{
  "id": "user123",
  "name": "Siddya",
  "email": "sidd@example.com",
  "age": 30,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### 3. Create User
- **URL**: `POST /createuser`
- **Request Body**:
```json
{
  "name": "Siddya",
  "email": "sidd@example.com",
  "age": 25
}
```
- **Response**:
```json
{
  "id": "user456",
  "name": "siddya",
  "email": "sidd@example.com",
  "age": 25,
  "createdAt": "2024-01-15T10:35:00Z",
  "message": "User created successfully"
}
```

#### 4. Update User
- **URL**: `PUT /updateuser?id={userId}`
- **Request Body**:
```json
{
  "name": "Pranav",
  "email": "test@gmail.com",
  "age": 26
}
```
- **Response**:
```json
{
  "id": "user456",
  "name": "Pranav",
  "email": "test@email.com",
  "age": 26,
  "createdAt": "2024-01-15T10:35:00Z",
  "message": "User updated successfully"
}
```

#### 5. Delete User
- **URL**: `DELETE /deleteuser?id={userId}`
```json
{
  "message": "User deleted successfully"
}
```

### Error Responses
All endpoints return appropriate HTTP status codes and error messages:

```json
{
  "error": "Error message description"
}
```

Common status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `404`: Not Found
- `405`: Method Not Allowed
- `500`: Internal Server Error

## 🔧 CRUD Operations Guide

### Create a New User
1. Click the "Add New User" button
2. Fill in the form with:
   - Name (required)
   - Email (required, must be valid email format)
   - Age (required, must be a positive number)
3. Click "Create User"
4. The user will be added to the table upon successful creation

### Read/View Users
- All users are displayed in a table format
- The table shows: Name, Email, Age
- Loading states are shown while fetching data
- Empty state is displayed when no users exist

### Update a User
1. Click the "Edit" button next to the user you want to update
2. Modify the fields as needed
3. Click "Update User"
4. The table will refresh with the updated information

### Delete a User
1. Click the "Delete" button next to the user you want to remove
2. Confirm the deletion in the popup dialog
3. The user will be removed from the table upon successful deletion

### UI Features
- **Alerts**: Success/error messages are displayed at the top of the page
- **Loading States**: Buttons and tables show loading indicators
- **Form Validation**: Client-side validation prevents invalid submissions
- **Responsive Design**: Works on desktop and mobile devices

## 🌍 Environment Variables

### Frontend Environment Variables
Create a `.env.local` file in the `assignment-frontend` directory:

```env
# API Endpoints
NEXT_PUBLIC_GET_USERS_URL=https://getusers-{your_id}.a.run.app
NEXT_PUBLIC_GET_USER_BY_ID_URL=https://getuserbyid-{your_id}.a.run.app
NEXT_PUBLIC_CREATE_USER_URL=https://createuser-{your_id}.a.run.app
NEXT_PUBLIC_UPDATE_USER_URL=https://updateuser-{your_id}.a.run.app
NEXT_PUBLIC_DELETE_USER_URL=https://deleteuser-{your_id}.a.run.app


```

### Backend Environment Variables
Firebase Functions automatically handle environment variables through Firebase configuration.


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **CSS not loading**: Ensure Tailwind CSS is properly configured and dependencies are installed
2. **API errors**: Check if Firebase Functions are deployed and environment variables are set
3. **Build errors**: Clear `.next` folder and rebuild: `rm -rf .next && npm run build`
4. **Docker issues**: Ensure Docker is running and ports are not conflicting

