FROM mark600/mbcl-ts-builder AS builder

RUN yarn build acts

FROM node

WORKDIR /app

COPY --from=builder tmp/package.json /app

COPY --from=builder tmp/dist/apps/acts /app/dist/acts

# RUN yarn install --immutable

# COPY . .

CMD ["yarn", "start", "acts"]