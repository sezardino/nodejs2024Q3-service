FROM node:18-alpine

RUN apk add --no-cache python3 py3-pip build-base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c","npm run db:migrate && npm run start:dev"]