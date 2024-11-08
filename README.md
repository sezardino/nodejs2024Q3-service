# NestJS Project with PostgreSQL and Prisma

## Description

This project is a NestJS-based application using PostgreSQL as the database and Prisma as the ORM. Docker is used to containerize the application, with separate `docker-compose` files provided for development (`docker-compose.dev.yml`) and production (`docker-compose.prod.yml`).

## Prerequisites

- Docker installed: [Docker Installation Guide](https://docs.docker.com/get-docker/)
- Docker Compose installed: [Docker Compose Installation Guide](https://docs.docker.com/compose/install/)

## Installation and Running the Project

### 1. Clone the Repository

```bash
git clone https://github.com/sezardino/nodejs2024Q3-service.git
cd nodejs2024Q3-service
```

### 2. Checkout to correct branch

```bash
git checkout dev-part-2
```

### 3. Create an Environment File

In the root directory, create a `.env` file and add the required environment variables. Example:

```dotenv
# .env
PORT=4001

CRYPT_SALT=10
JWT_SECRET_KEY=secret123123
JWT_SECRET_REFRESH_KEY=secret123123
TOKEN_EXPIRE_TIME=1h
TOKEN_REFRESH_EXPIRE_TIME=24h


POSTGRES_USER=prisma_user
POSTGRES_PASSWORD=prisma_password
POSTGRES_DB=prisma_db

DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}

NODE_ENV=production
```

### 4. Start the Project

#### For Development

To start in development mode, use the `docker-compose.dev.yml` file:

```bash
docker-compose -f docker-compose.dev.yml up -d --build
```

#### For Production

To start in production mode, use the `docker-compose.prod.yml` file:

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

### 5. Enter the Container and Run Migrations

Prisma migrations need to be applied for the database to work properly.

1. Enter the application container:

   ```bash
   docker exec -it app /bin/sh
   ```

   Replace `app` with your application container’s name. This is usually the name of the `app` service in the `docker-compose` file, such as `app_dev` or `app_prod`.

2. Run Prisma migrations:

   ```bash
   npx prisma migrate deploy
   ```

3. (Optional) To inspect or manage the data, you can use Prisma Studio:

   ```bash
   npx prisma studio
   ```

### 6. Verification

Once migrations are complete, the application should be available on port `3000`:

- URL: `http://localhost:3000`

### Stopping the Containers

To stop and remove containers, use the command below for the respective environment.

#### For Development

```bash
docker-compose -f docker-compose.dev.yml down
```

#### For Production

```bash
docker-compose -f docker-compose.prod.yml down
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
   - For development: `docker-compose -f docker-compose.dev.yml up -d --build`
   - For production: `docker-compose -f docker-compose.prod.yml up -d --build`
4. **Enter the application container**:
   - Command: `docker exec -it app /bin/sh`
5. **Run Prisma migrations**:
   - Command: `npx prisma migrate deploy`
6. **Verify the application** is running at `http://localhost:4000`.
7. **Stop containers** when done:
   - For development: `docker-compose -f docker-compose.dev.yml down`
   - For production: `docker-compose -f docker-compose.prod.yml down`

Following these steps will ensure the project is correctly set up and ready to run.
