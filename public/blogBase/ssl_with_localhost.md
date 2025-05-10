---
title: Setting Up SSL with Localhost Using mkcert & Nginx
date: 2025-02-06 12:40:00
tags: ["ssl", "localhost", "mkcert", "nginx", "docker"]
---

In this comprehensive guide, we will walk you through the process of setting up SSL with localhost using mkcert and Nginx.

## Prerequisites
- [mkcert](https://github.com/FiloSottile/mkcert "mkcert")
- [Nginx](https://nginx.org/en/ "Nginx")
- [Docker](https://www.docker.com/ "Docker")
- [Docker Compose](https://docs.docker.com/compose/ "Docker Compose")
- [Vue Application](https://vuejs.org/ "Vue") (Optional: This could be any frontend application that you want to serve over HTTPS)

## Folder Structure
To facilitate this guide, we assume the following folder structure for your project. You can customize it as needed, but remember to adjust the commands accordingly:
```
.
├── frontend (Vue application)
│   ├── Dockerfile
├── nginx
│   ├── certs
│   │   ├── cert.pem
│   │   ├── key.pem
│   ├── logs
│   ├── nginx.conf
├── docker-compose.yml
```

## mkcert

Prepare a certificate authority (CA) and a certificate for your local development environment using `mkcert`. You can install `mkcert` by following the instructions on the [official repository](https://github.com/FiloSottile/mkcert?tab=readme-ov-file#installation)
for installing `mkcert`.

After installing `mkcert`, run the following commands to create a local CA and a certificate for your localhost:

```bash
cd nginx/certs
mkcert -key-file key.pem -cert-file cert.pem example.com *.example.com

# Replace example.com with your domain name or localhost
```

This command will generate two files: `key.pem` and `cert.pem`. The `key.pem` file contains the private key, and the `cert.pem` file contains the certificate.


## Docker Compose

Create a `docker-compose.yml` file in the root directory of your project with the following content:

```yaml
services:
	nginx:
    image: nginx:latest
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf
      - ./nginx/certs:/etc/nginx/certs
      - ./nginx/logs:/var/log/nginx
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
    networks:
      - my-network

	web:
		build: ./frontend
		working_dir: /app
		ports:
			- "3000:3000"
		volumes:
			- ./frontend:/app
			- /app/node_modules # Optional: If you want to cache node_modules
		depends_on:
			- nginx
		networks:
			- my-network

networks:
	my-network:
		driver: bridge
```

Here, we define two services: `nginx` and `web`. The `nginx` service uses the `nginx:latest` image and mounts the necessary volumes for the configuration files, certificates, and logs. The `web` service builds the frontend application and mounts the necessary volumes for the application files.

## Nginx Configuration

Now, let's create an Nginx configuration file `nginx.conf` in the `nginx` directory with the following content:

```nginx
server {
		listen 80;
		server_name example.com;

		location / {
				proxy_pass http://web:3000;
				proxy_set_header Host $host;
				proxy_set_header X-Real-IP $remote_addr;
				proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
				proxy_set_header X-Forwarded-Proto $scheme;
		}
}
```

This configuration file sets up a server block that listens on port 80 and proxies requests to the `web` service running on port 3000.

Note: Replace `example.com` with your domain name or localhost.

## Configuring hosts file

Add the following entry to your hosts file (`/etc/hosts` on Unix-based systems or `C:\Windows\System32\drivers\etc\hosts` on Windows) to map your domain name to `localhost`:

```
127.0.0.1 example.com
```

## Running the Application

With everything set up, it's time to run your application:

```bash
docker compose up
```

This command will start the Nginx server and the frontend application. Access your application at `https://example.com`.

That's it! You have successfully set up SSL with localhost using mkcert and Nginx. You can now develop and test your applications locally with HTTPS enabled. Happy coding!
