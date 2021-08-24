FROM node:16.7-alpine

WORKDIR /app
COPY package*.json tsconfig*.json ./
COPY ./src ./src
COPY ./build.sh ./build.sh

RUN npm ci && \
    npm run build && \
    npm prune --production && \
    npm ci --production && \
    npm cache clean --force

#WORKDIR /data

#USER node
ENTRYPOINT ["node", "/app/dist/index.js"]
#CMD [ "api" ]
