# Étape de build
FROM node:20 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Étape de run
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
