FROM node

RUN yarn global add @nestjs/cli

WORKDIR /tmp
COPY package.json /tmp
RUN yarn install --immutable
COPY . .