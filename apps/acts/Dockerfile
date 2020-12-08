FROM mark600/mlp-ts-builder AS builder

RUN yarn build acts

FROM node:alpine

RUN yarn global add @nestjs/cli

WORKDIR /app

COPY --from=builder tmp/package.json /app

COPY --from=builder tmp/dist/apps/acts /app/dist/acts

# RUN yarn install --immutable

# COPY . .

CMD ["yarn", "start", "acts", "--watch"]