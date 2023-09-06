#Stage one
FROM node:14 AS build-stage

ARG ENV_CONFIG

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build:${ENV_CONFIG}

#Stage two
FROM nginx as production-stage

RUN mkdir /app

COPY --from=build-stage /app/dist /app

COPY nginx.conf /etc/nginx/nginx.conf