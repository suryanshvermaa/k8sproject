# VM Management System

A full-stack application for managing virtual machines with Redis caching and PostgreSQL database.

## Project Overview

This project is a modern web application that provides a platform for managing virtual machines. It features a robust backend with Redis caching for improved performance and PostgreSQL for persistent storage.

### Key Features

- User authentication and authorization
- Virtual machine management
- Redis caching for improved performance
- PostgreSQL database for data persistence
- Kubernetes integration
- Modern React frontend with TypeScript
- Docker containerization

## Tech Stack

### Backend
- Node.js with TypeScript
- Express.js
- Prisma ORM
- Redis for caching
- PostgreSQL database
- JWT for authentication
- Kubernetes client for container orchestration

### Frontend
- React with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- React Router for navigation
- Axios for API calls
- React Toastify for notifications

## Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- Docker and Docker Compose
- Kubernetes cluster (for deployment)

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/suryanshvermaa/k8sproject.git
cd k8sproject
```

2. Install dependencies:
```bash
pnpm install
cd vm-app-frontend
pnpm install
cd ..
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
REDIS_URL="redis://:password@localhost:6379"
JWT_SECRET="your-jwt-secret"
```

4. Start the development environment:
```bash
# Start the database and Redis services
docker-compose up -d

# Start the backend server
pnpm dev

# In a new terminal, start the frontend
cd vm-app-frontend
pnpm dev
```

## API Routes

### Authentication Routes
- `POST /api/v1/signup` - Register a new user
- `POST /api/v1/login` - Login user


### VM Routes
- `POST /api/vms/createVM` - Create VM (protected)

## Frontend Components

The frontend is built with React and includes the following key components:

- Authentication components (Login/Register)
- Dashboard layout
- VM management interface
- User profile management
- Navigation components
- Toast notifications

## Deployment

The application can be deployed using Docker and Kubernetes:

1. Build the Docker images:
```bash
docker-compose build
```

2. Deployment for checking vms:(for testing vm)
```bash
kubectl apply -f k8smanifests/
```

## Development

### Backend Development
- The backend uses TypeScript and follows a modular architecture
- Controllers handle business logic
- Routes define API endpoints
- Middleware handles authentication and request processing
- Prisma is used for database operations

### Frontend Development
- The frontend uses Vite for fast development and building
- Components are organized by feature
- TailwindCSS is used for styling
- React Router handles navigation
- Axios is used for API communication

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

