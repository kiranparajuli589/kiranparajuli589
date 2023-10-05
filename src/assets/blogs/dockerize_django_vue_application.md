---
title: Steps to dockerize your django vue application
date: 2023-10-12 12:00:00
tags: ["django", "vue", "docker", "docker-compose", "gunicorn", "vite"]
---

# Steps to dockerize your django vue application
This is a step-wise guide to dockerize your django + vue application.

## Prerequisites
- Docker
- Docker-compose
- Django application
- Vue application (Vue + Vite)

## Folder Structure
This is an assumption of the folder structure of your project. You can change it to your liking but you will have to change the commands accordingly.
```
.
├── backend (django application)
│   ├── Dockerfile
├── frontend (vue application)
│   ├── Dockerfile
├── docker-compose.yml
```

## Dockerfile for Django Application
Here we assume following things for django:
1. Port to expose: `8000`
2. Serve using: `gunicorn`
3. Database: `postgres`

### Gunicorn configuration
```pycon
workers = 4
max_requests = 1000
timeout = 30
bind = "0.0.0.0:8000"
preload_app = True
accesslog = "logs/gunicorn_access.log"
errorlog = "logs/gunicorn_error.log"
```

Note: We are using `0.0.0.0` to bind so that it can be accessed from outside the container.

### Backend dockerfile
We just make the playground ready for the application. We will use `docker compose` to run the application.

Here we assume following things for django:
1. Port to expose: `8000`
2. Serve using: `gunicorn`
3. Database: `postgres`
4. Dependencies List in: `requirements.txt`

```dockerfile
FROM python:3.10

WORKDIR /app

COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["gunicorn", "backend.wsgi:application", "--config", "gunicorn.py"]
```

Note: Here we do not copy all the files to the container. We will use `volumes` to mount the files to the container from `docker compose` so that the hot reloading feature keeps intact.

### Frontend Dockerfile
Again, we just make the playground ready for the application. We will use `docker compose` to run the application.

Here we assume following things for vue:
1. Port to expose: `3000`
2. Serve using: `vite`

Add following to `package.json` to make it work with docker.
```json
{
	"scripts": {
		"dev": "vite",
		"dev:docker": "vite --host"
	}
}
```

Note: `vite` command is used with `--host` flag to make it accessible from outside the container.

```dockerfile
FROM node:20-alpine3.17

WORKDIR /app

COPY package.json pnpm-lock.yaml /app/
RUN npm install -g pnpm
RUN pnpm install


EXPOSE 3000

CMD ["pnpm", "dev:docker"]
```

Note: Here too, we do not copy all the files to the container. We will use `volumes` to mount the files to the container from `docker compose` so that the hot reloading feature keeps intact.

## Docker compose
Finally, we are now at the driver seat. We will use `docker compose` to run the application.
```yaml
version: '3.8'

services:
  postgres:
    container_name: sachchai-postgres
    image: postgres:16.0-alpine
    restart: always
    environment:
      POSTGRES_USER: sachchai
      POSTGRES_PASSWORD: sachchai
      POSTGRES_DB: sachchai
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: [ "CMD", "pg_isready", "-U", "sachchai" ]
      interval: 5s
      timeout: 5s
      retries: 5
    ports:
      - "5433:5432"

  backend:
    container_name: sachchai-backend
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
    container_name: sachchai-frontend
    build:
      context: ./dove
    volumes:
      - ./dove:/app
      - ./dove/.env.example:/app/.env
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

Now let's break it down:
1. `depends_on` and `healthcheck` are used to make sure that the dependent services are up and running before starting the application. Here we are using `postgres` as a database for our django application. So we are making sure that the `postgres` service is up and running before starting the `backend` service. Similarly, we are making sure that the `backend` service is up and running before starting the `web` service.
2. `volumes` are used to mount the files from the host machine to the container. Here we are mounting the `backend` and `frontend` folders to the respective containers. We are also mounting the `.env.docker` file to the respective containers. This file contains the environment variables for the application. You can also use `environment` to set the environment variables, but I prefer to use `.env` file.
3. `ports` are used to expose the ports from the container to the host machine. Here we are exposing `8000` and `3000` ports from `backend` and `web` containers respectively. Also, I've mapped the `postgres` port to `5433` on the host machine so that it does not conflict with my host machine's postgres service. You can change it to your liking.

## Running the application
Now that we have everything in place, let's run the application.
```bash
docker-compose up
```

This should spin up postgres with the given database and user. It should also spin up the backend and frontend services. You can access the application at `http://localhost:3000`. But wait, we haven't run the migrations yet. Let's do that now.

```bash
docker-compose exec backend python manage.py migrate
```

### Now you may think, Why waiting this late for migrations?
Well, the migrations is not a one time thing. You will have to run it every time you make changes to the models. So, I prefer to run it after the application is up and running. This way, I don't have to worry about running the migrations every time I make changes to the models.

Also, do not put the command to create superuser in the `Dockerfile`. You can do it manually by running the following command.
```bash
docker-compose exec backend python manage.py createsuperuser
```
If you put it in the `Dockerfile`, it will run every time you spin up the application. This will cause an error if the superuser already exists.

Static files missing? So, you will have to run the following command to collect the static files.
```bash
docker-compose exec backend python manage.py collectstatic
```

## Conclusion
That's it, you have successfully dockerized your django vue application. Now you can deploy it to any cloud provider of your choice.
