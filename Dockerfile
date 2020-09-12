FROM node:12.15-alpine

RUN mkdir -p /usr/src/tanksystem-api

WORKDIR /usr/src/tanksystem-api

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run start

EXPOSE 9000
