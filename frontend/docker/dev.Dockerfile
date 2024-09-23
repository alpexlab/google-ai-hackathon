FROM node:20.11.1-alpine AS base

WORKDIR /frontend/

COPY package* .

RUN npm ci

COPY . .

CMD ["npm", "run", "dev", "--","--host"]
