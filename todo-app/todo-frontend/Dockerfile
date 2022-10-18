FROM node:16 AS test-stage

WORKDIR /usr/src/app

COPY . .

RUN CI=true npm test

FROM test-stage AS build-stage 

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV REACT_APP_BACKEND_URL=http://localhost:3001/api/

RUN npm run build

RUN npm install -g serve

CMD ["serve", "build"]
