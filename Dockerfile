FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    ffmpeg

COPY package*.json ./

RUN npm i

COPY . .

CMD ["node", "./src/index.js"]