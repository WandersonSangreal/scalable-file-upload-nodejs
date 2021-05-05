FROM node:15-alpine

RUN apk add --no-cache bash

WORKDIR /usr/src/app

# RUN npm install -g npm@latest
RUN npm install -g nodemon

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
