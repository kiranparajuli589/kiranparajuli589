---
title: "Dockerizing Your Django Vue Application: A Step-by-Step Guide"
date: 2023-10-12 12:00:00
tags: ["django", "vue", "docker", "docker-compose", "gunicorn", "vite"]
---

In this comprehensive guide, we will walk you through the process of dockerizing your Django and Vue applications.

## Prerequisites
- Docker (version 20.x.x or higher)
- Docker-compose (version 2.x.x or higher)
- Django application (Django + Gunicorn)
- Vue application (Vue + Vite)

## Folder Structure
To facilitate this guide, we assume the following folder structure for your project. You can customize it as needed, but remember to adjust the commands accordingly:
```
.
├── backend (Django application)
│   ├── Dockerfile
├── frontend (vue application)
│   ├── Dockerfile
├── docker-compose.yml
```

## Dockerfile for Django Application

For the Django application, we'll make the following assumptions:

1. Port to expose: `8000`
2. Serve using: `gunicorn`
3. Database: `postgres`

### Gunicorn Configuration
```python
workers = 4
max_requests = 1000
timeout = 30
bind = "0.0.0.0:8000"
preload_app = True
accesslog = "logs/gunicorn_access.log"
errorlog = "logs/gunicorn_error.log"
```

Note: We use `0.0.0.0` for binding to allow access from outside the container.

### Dockerfile for Backend
In this section, we'll prepare the playground for your Django application. We will use Docker Compose to run the application. Here are the assumptions:

1. Port to expose: `8000`
2. Serve using: `Gunicorn`
3. Database: `PostgreSQL`
4. Dependencies Listed in: `requirements.txt`

```dockerfile
FROM python:3.10

WORKDIR /app

COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["gunicorn", "backend.wsgi:application", "--config", "gunicorn.py"]
```

Note: We won't copy all files to the container; instead, we'll use volumes to mount files from Docker Compose to preserve hot-reloading functionality.

### Dockerfile for Frontend
Similarly, we'll prepare the playground for your Vue application. We will use Docker Compose to run the application. For Vue, we'll assume:

1. Port to expose: `3000`
2. Serve using: `Vite`

To make it work with Docker, add the following to your `package.json`:
```json
{
	"scripts": {
		"dev:docker": "vite --host"
	}
}
```

Note: We use `vite` with the `--host` flag to make it accessible from outside the container.

```dockerfile
FROM node:20-alpine3.17

WORKDIR /app

COPY package.json pnpm-lock.yaml /app/
RUN npm install -g pnpm
RUN pnpm install


EXPOSE 3000

CMD ["pnpm", "dev:docker"]
```

Just like with the Django application, we won't copy all files to the container, relying on Docker Compose volumes for file mounting to maintain hot-reloading.

## Docker compose
Now, let's dive into Docker Compose to run your application.


```yaml
version: '3.8'

services:
  postgres:
    container_name: db
    image: postgres:16.0-alpine
    restart: always
    environment:
      POSTGRES_USER: einstein
      POSTGRES_PASSWORD: relativity
      POSTGRES_DB: einstein
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: [ "CMD", "pg_isready", "-U", "einstein" ]
      interval: 5s
      timeout: 5s
      retries: 5
    ports:
      - "5433:5432"

  backend:
    container_name: backend
    build:
      context: ./backend
    volumes:
      - ./backend/:/app
      - ./backend/.env.docker:/app/.env
      - ./backend/logs:/app/logs
    depends_on:
      postgres:
        condition: service_healthy
    ports:
      - "8000:8000"
    healthcheck:
      test: [ "CMD", "curl", "-f", "http://localhost:8000/healthcheck" ]
      interval: 5s
      timeout: 5s
      retries: 5

  frontend:
    container_name: web
    build:
      context: ./frontend
    volumes:
      - ./frontend:/app
      - ./frontend/.env.example:/app/.env
    depends_on:
      backend:
        condition: service_healthy
    ports:
      - "3000:3000"

volumes:
  pgdata:
  media:
  static:
```

### To break it down:

1. We use `depends_on` and `healthcheck` to ensure dependent services are up and running before starting. PostgreSQL is used as the database for the Django application, so we ensure that the `postgres` service is operational before launching the `backend` service. A similar approach is used for the `frontend` service.
2. Volumes are employed to mount files from the host machine to the container. We mount backend and frontend folders to their respective containers and include the `.env.docker` file containing environment variables.
3. Ports are exposed to make container ports accessible from the host machine. In this configuration, we've mapped `8000` and `3000` from the backend and frontend containers, respectively. Additionally, PostgreSQL's port is mapped to 5433 on the host to avoid conflicts.

## Running the application

With everything set up, it's time to run your application:

```bash
docker compose up
```

This command will spin up PostgreSQL with the specified database and user. It will also start the backend and frontend services. Access your application at `http://localhost:3000`.

To run migrations, execute the following command:

```bash
docker compose exec backend python manage.py migrate
```
The choice to run migrations after the application is up allows for easy updates to models without manual migration execution.

To create a superuser, run:

```bash
docker compose exec backend python manage.py createsuperuser
```
Avoid putting superuser creation in the Dockerfile to prevent errors if the superuser already exists.

To collect static files, use this command:

```bash
docker compose exec backend python manage.py collectstatic
```

## Conclusion

#### Congratulations, you've successfully dockerized your Django Vue application! Now, you can deploy it to your preferred cloud provider or use it for the development environment. Happy coding!
