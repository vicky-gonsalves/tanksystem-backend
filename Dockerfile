FROM node:latest

RUN mkdir -p /usr/src/tanksystem-api

WORKDIR /usr/src/tanksystem-api

COPY package.json ./

RUN npm install --pure-lockfile

COPY . .

EXPOSE 9000

CMD [ "npm", "start" ]
