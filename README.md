# Portfolio Website - Nuxt 4

A modern portfolio website built with Nuxt 4, Nuxt UI, and Tailwind CSS.

## Tech Stack

- **Framework**: Nuxt 4
- **UI Library**: Nuxt UI
- **Styling**: Tailwind CSS v4
- **Package Manager**: pnpm
- **Linting**: ESLint with @nuxt/eslint

## Project Structure

```
/app
  /components    # Vue components
  /composables   # Composable functions
  /layouts       # Layout components
  /pages         # File-based routing
  /assets        # Static assets
  /styles        # SCSS styles
  /utils         # Utility functions
```

## Getting Started

### Prerequisites

- Node.js LTS (20+)
- pnpm 8+

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Preview

```bash
pnpm preview
```

### Linting

```bash
pnpm lint
```

## VS Code Settings

The project includes `.vscode/settings.json` with:
- Auto-save enabled (1s delay)
- ESLint auto-fix on save
- Format on save

## Migration from Vue 3 + Vuetify

This project has been migrated from Vue 3 with Vuetify to Nuxt 4 with Nuxt UI and Tailwind CSS. The migration includes:

- ✅ Nuxt 4 project structure with app directory
- ✅ Nuxt UI replacing Vuetify components
- ✅ Tailwind CSS v4 for styling
- ✅ File-based routing
- ✅ Composables for state management
- ✅ Latest ESLint configuration
- ✅ VS Code settings for auto-save

## Deployment

The project can be deployed to any static hosting service that supports Nuxt:

```bash
pnpm generate
```

This creates a `dist` folder ready for static deployment.

## Docker Deployment

This application is fully containerized and can be run using Docker.

### Building and Running with Docker

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

### Building with Docker directly

```bash
# Build the image
docker build -t kiranparajuli-app .

# Run the container
docker run -p 3000:3000 kiranparajuli-app
```

The application will be available at `http://localhost:3000`.

### Development with Docker

For development, you can still use the local environment:

```bash
pnpm dev
```

This will start the development server at `http://localhost:3000` with hot module replacement.
