FROM node:16

COPY package*.json tsconfig*.json ./
COPY ./src ./src

RUN npm ci
#COPY . .
RUN npm run build

# Clean build
RUN npm ci --production
RUN npm cache clean --force

#USER node
ENTRYPOINT ["node", "./dist/index.js"]
#CMD [ "api" ]
