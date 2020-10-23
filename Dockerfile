FROM node:alpine
WORKDIR /tmp
COPY package.json /tmp
RUN yarn install --immutable
COPY . .