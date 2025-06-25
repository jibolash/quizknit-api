# ARG NODE_VERSION=18.16.1
# FROM node:${NODE_VERSION}-slim as base
FROM node:22-alpine as base

LABEL fly_launch_runtime="Node.js/Prisma"
# Set production environment
# ENV NODE_ENV="production"

WORKDIR /usr/src/app

# Throw-away build stage to reduce size of final image
FROM base as build

COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src

RUN npm install typescript -g

RUN npm ci
# RUN npx prisma generate

COPY . .

RUN npx tsc

EXPOSE 3000
CMD [ "node", "dist/index.js" ]
