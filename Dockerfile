FROM node:22.17-alpine

WORKDIR /app
COPY package*.json tsconfig*.json ./
COPY ./src ./src

RUN npm ci && \
    npm run build && \
    npm prune --production && \
    npm ci --production && \
    npm cache clean --force

#WORKDIR /data
ENV NODE_ENV=production
#USER node
ENTRYPOINT ["node", "/app/dist/index.js"]
#CMD [ "api" ]
