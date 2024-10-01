# Base image
FROM node:18-alpine AS base

# Install dependencies
FROM base AS dependencies
WORKDIR /app
COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci

# Build app
FROM base AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:1.25.4-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
