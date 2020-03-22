FROM node:10.16.0-buster-slim AS build

WORKDIR /app
COPY ./package.json .

RUN npm install

COPY ./build .
COPY ./proto ./proto/

ENV TEMPLATE_PATH=client/index.html

CMD [ "node", "./server.js" ]
