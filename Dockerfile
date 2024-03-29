FROM node:18-alpine

WORKDIR /app/backend

COPY package.json package-lock.json /app/backend/

RUN npm install 

COPY . .

RUN npm install pm2 -g

EXPOSE 5000

CMD ["pm2-runtime", "src/index.js"]