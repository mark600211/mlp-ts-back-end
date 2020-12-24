FROM mark600/mlp-ts-builder AS builder

RUN yarn build acts

FROM node:alpine

WORKDIR /app

COPY --from=builder tmp/package.json /app

RUN yarn install
RUN yarn global add @nestjs/cli

COPY --from=builder tmp/dist/apps/acts /app/dist/acts

CMD ["yarn", "start", "acts"]