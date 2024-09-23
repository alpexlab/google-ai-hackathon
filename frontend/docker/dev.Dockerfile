FROM node:20.11.1-alpine AS base

WORKDIR /alpexlab/

COPY package* .

RUN npm ci

COPY . .

CMD ["npm", "run", "dev", "--","--host"]
