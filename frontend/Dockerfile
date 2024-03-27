FROM node:18 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80
