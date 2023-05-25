FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update
RUN apk add
RUN apk add ffmpeg

RUN npm i

COPY . .

CMD ["node", "./src/index.js"]