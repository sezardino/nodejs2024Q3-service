# NestJS Project with PostgreSQL and Prisma

## Description

This project is a NestJS-based application using PostgreSQL as the database and Prisma as the ORM. Docker is used to containerize the application.

This is a RESTful API built with [NestJS](https://nestjs.com/). The project includes a Swagger API documentation, which makes it easy to understand and test the available endpoints.

## Prerequisites

- Docker installed: [Docker Installation Guide](https://docs.docker.com/get-docker/)
- Docker Compose installed: [Docker Compose Installation Guide](https://docs.docker.com/compose/install/)

## Installation and Running the Project

### 1. Clone the Repository

```bash
git clone https://github.com/sezardino/nodejs2024Q3-service.git
cd nodejs2024Q3-service
```

### 2. Create an Environment File

In the root directory, create a `.env` file and add the required environment variables. Example:

```dotenv
# .env
PORT=8080

LOG_LEVEL=0
LOG_FILE_MAX_SIZE=10240

CRYPT_SALT=10
JWT_SECRET_KEY=secret123123
JWT_SECRET_REFRESH_KEY=secret123123
TOKEN_EXPIRE_TIME=1h
TOKEN_REFRESH_EXPIRE_TIME=24h

POSTGRES_USER=prisma_user
POSTGRES_PASSWORD=prisma_password
POSTGRES_DB=prisma_db
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}

NODE_ENV=production
```

### 3. Start the Project

To start, use the `docker-compose.yml` file:

```bash
docker-compose -f docker-compose.yml up --build
```

### 4. Verification

Once migrations are complete, the application should be available on port `8080`:

- URL: `http://localhost:8080`

### 5 Stopping the Containers

To stop and remove containers, use the command below for the respective environment.

#### For Development

```bash
docker-compose -f docker-compose.yml down
```

## Notes

- If the database configuration changes, make sure to update the `DATABASE_URL` variable in the `.env` file.
- You may need to adjust PostgreSQL’s external port in the `docker-compose` file to avoid conflicts.

---

## Summary: Project Setup Checklist

To launch the project, ensure the following steps are completed:

1. **Clone the repository** and navigate to the project directory.
2. **Create a `.env` file** with the required environment variables, especially `DATABASE_URL`.
3. **Start the Docker containers**:
   - `docker-compose -f docker-compose.yml up --build`
4. **Verify the application** is running at `http://localhost:8080`.
5. **Stop containers** when done:
   - `docker-compose -f docker-compose.yml down`

Following these steps will ensure the project is correctly set up and ready to run.
