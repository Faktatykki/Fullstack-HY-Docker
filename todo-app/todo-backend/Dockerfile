FROM node:16

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

CMD npm start
