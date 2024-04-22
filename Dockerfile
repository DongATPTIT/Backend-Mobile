FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
# RUN npm install -g @nestjs/cli
COPY . .
CMD npm run start:dev