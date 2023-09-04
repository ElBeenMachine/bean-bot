FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update
RUN apk add --update --no-cache \
    ffmpeg \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev

RUN npm i

COPY . .

CMD ["node", "./src/index.js"]