FROM node:14.10.1-alpine

RUN mkdir -p /usr/src/tanksystem-api

WORKDIR /usr/src/tanksystem-api

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run start

EXPOSE 9000
