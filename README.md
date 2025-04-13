# Angular Todo Application

![alt text](/images/image.png)
![alt text](/images/image-1.png)

A full-stack todo application built with Angular, Express, and PostgreSQL.

## System Architecture

This application uses a three-tier architecture:

- **Frontend**: Angular 19 application with responsive design and theme switching
- **Backend**: Express.js REST API
- **Database**: PostgreSQL for data persistence

The components are containerized with Docker for easy deployment.

## Features

- Create, read, update, and delete todo items

![alt text](/images/image-2.png)
![alt text](/images/image-3.png)

- Mark todos as completed

![alt text](/images/image-4.png)

- Responsive design that works on mobile and desktop
- Light/dark theme toggle with system preference detection
- Comprehensive API testing with Jest and Supertest
- Containerized deployment with Docker

## Setup Instructions

### Using Docker (Recommended)

1. Make sure you have [Docker](https://www.docker.com/get-started) and Docker Compose installed
2. Clone this repository
3. Start the application:
   ```bash
   docker-compose up
   ```
4. Access the application at http://localhost:80

### Manual Setup

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up PostgreSQL and create the `.env` file with your database connection string
4. Start the server:
   ```bash
   node server.js
   ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/todo-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Access the application at http://localhost:4200

## Project Structure

```
├── docker-compose.yml     # Docker compose configuration
├── backend/               # Node.js Express API
│   ├── .env               # Environment variables (keep this secure!)
│   ├── Dockerfile         # Backend Docker configuration
│   ├── package.json       # Backend dependencies
│   ├── server.js          # Express server implementation
│   └── server.test.js     # API endpoint tests
└── frontend/
    └── todo-app/          # Angular application
        ├── Dockerfile     # Frontend Docker configuration
        ├── nginx.conf     # Nginx configuration for production
        ├── src/           # Application source code
        └── ...            # Angular configuration files
```

## Technologies

- **Frontend**:

  - Angular 19
  - RxJS
  - CSS Custom Properties for theming
  - Responsive design with mobile optimization

- **Backend**:

  - Express.js
  - PostgreSQL with node-postgres
  - CORS support
  - Jest & Supertest for API testing

- **DevOps**:
  - Docker and Docker Compose
  - Nginx for serving static assets

## Development

### Running Tests

To run frontend tests:

```bash
cd frontend/todo-app
npm test
```

To run backend tests:

```bash
cd backend
npm test
```

### Building for Production

To build the application without Docker:

```bash
cd frontend/todo-app
npm run build
```

## Deployed App

The app has been deployed on AWS. You can try it out at http://3.126.139.64/
