FROM node:18-alpine

WORKDIR /app/backend

COPY package.json package-lock.json /app/backend/

RUN npm install 

COPY . .

RUN npm install ts-node -g

ARG NODE_ENV=production

EXPOSE 5000

CMD ["ts-node", "src/index.ts"]