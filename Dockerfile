# Multi-stage build for Nuxt.js application

# Stage 1: Dependencies
FROM node:lts-alpine AS deps
RUN corepack enable && corepack prepare pnpm@10.18.2 --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 2: Build
FROM node:lts-alpine AS builder
RUN corepack enable && corepack prepare pnpm@10.18.2 --activate
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Stage 3: Production
FROM node:lts-alpine AS runner
RUN corepack enable && corepack prepare pnpm@10.18.2 --activate
WORKDIR /app

# Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxt

# Copy necessary files
COPY --from=builder --chown=nuxt:nodejs /app/.output ./
COPY --from=builder --chown=nuxt:nodejs /app/public ./public
COPY --from=builder --chown=nuxt:nodejs /app/package.json ./

USER nuxt

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["node", "server/index.mjs"]

