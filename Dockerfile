FROM node:latest

RUN mkdir -p /usr/src/tanksystem-api

WORKDIR /usr/src/tanksystem-api

COPY package.json package-lock.json ./

RUN npm install --pure-lockfile

COPY . .

EXPOSE 9000
