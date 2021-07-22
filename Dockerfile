FROM node:16

WORKDIR /app
COPY package*.json tsconfig*.json ./
COPY ./src ./src

RUN npm ci
#COPY . .
RUN npm run build

# Clean build
RUN npm ci --production
RUN npm cache clean --force

WORKDIR /data

#USER node
ENTRYPOINT ["node", "/app/dist/index.js"]
#CMD [ "api" ]
