FROM node:8.11

WORKDIR /app

COPY lib ./lib

COPY package.json package-lock.json ./

RUN npm install --production

CMD npm start