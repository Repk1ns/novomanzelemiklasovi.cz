FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

ENV WATCHPACK_POLLING=true

COPY . .

CMD ["npm", "run", "dev"]