FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update
RUN apk add --update --no-cache \
    ffmpeg \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    libtool \
    autoconf \
    automake

RUN npm i

COPY . .

CMD ["node", "./src/index.js"]