FROM node:16.14.0
#ENV HOSTNAME backend

COPY package*.json ./

# Папка приложения
ARG APP_DIR=/home/agro
RUN mkdir -p ${APP_DIR}
RUN mkdir -p /home/agro/build
WORKDIR ${APP_DIR}

RUN npm install --only=development
RUN npm i postgresql-client

# копируем исходный код
COPY . .

# Запуск сборки NodeJS
RUN apt update
RUN apt install mc -y
RUN npm install
RUN npm ci
ENV NODE_ENV=development
RUN npm run build

EXPOSE 4000
ENTRYPOINT ["npm", "run", "start"]
