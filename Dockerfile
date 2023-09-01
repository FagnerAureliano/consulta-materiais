FROM node:14 AS build-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG ENV_CONFIG

RUN npm run build:${ENV_CONFIG}

FROM nginx:alpine

COPY --from=build-stage /usr/src/app/dist/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
