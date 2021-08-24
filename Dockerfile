FROM node:16.7-alpine

WORKDIR /app
COPY package*.json tsconfig*.json ./
COPY ./src ./src
COPY ./build.sh ./build.sh

RUN sh build.sh
#WORKDIR /data

#USER node
ENTRYPOINT ["node", "/app/dist/index.js"]
#CMD [ "api" ]
