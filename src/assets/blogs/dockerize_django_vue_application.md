# Steps to dockerize your django vue application

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
```dockerfile
