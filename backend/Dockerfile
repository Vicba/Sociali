FROM node:17-alpine

WORKDIR /app

COPY . .

RUN npm install 

COPY package.json .

EXPOSE 8080

CMD ["node", "index.js"]