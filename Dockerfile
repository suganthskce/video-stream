FROM node:12-alpine

WORKDIR /app

ENV PORT 80

COPY package.json /app/package.json

RUN npm install

COPY . /app

CMD ["node", "index.js"]