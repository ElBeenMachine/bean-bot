FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

CMD ["node", "./src/index.js"]