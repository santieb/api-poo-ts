FROM node:16-alpine

RUN  npm install -g ts-node

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install

ENV NODE_ENV=production

RUN npm run migrations:generate -- src/migrations/initDB
RUN npm run migrations:run

EXPOSE 3001

CMD ["npm", "start"]