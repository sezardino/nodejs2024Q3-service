# Home Library Service

This is a RESTful API built with [NestJS](https://nestjs.com/). The project includes a Swagger API documentation, which makes it easy to understand and test the available endpoints.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (v6 or higher)

## Installation

Follow these steps to set up the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/sezardino/nodejs2024Q3-service
cd nodejs2024Q3-service
```

### 2. Set correct branch

```bash
git checkout dev-part-1
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file at the root of your project (if not provided) and add any required environment variables. For example:

```env
PORT=4001

CRYPT_SALT=10
JWT_SECRET_KEY=secret123123
JWT_SECRET_REFRESH_KEY=secret123123
TOKEN_EXPIRE_TIME=1h
TOKEN_REFRESH_EXPIRE_TIME=24h
```

Update the variables as needed.

### 5. Start the Application

To start the application in development mode, run:

```bash
npm run start:dev
```

The application should now be running on `http://localhost:4001`.

### 6. Access Swagger API Documentation

The project includes Swagger documentation, which is available at:

```
http://localhost:4001/api/docs
```

This documentation provides a UI for testing all available API endpoints and their parameters.

## Scripts

- **`npm run start`** - Starts the application in production mode.
- **`npm run start:dev`** - Starts the application in development mode.
- **`npm run test`** - Runs the test suite.
- **`npm run build`** - Builds the application.

## Checklist for Setting Up the Application

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Configure environment variables in `.env`.
4. Start the application with `npm run start:dev`.
5. Access the Swagger documentation at `http://localhost:4000/api/docs`.
