# Cria um container usando Multi Stage Builds para reduzir seu tamanho,
# não instalando no container final coisas como o npm.
# https://btholt.github.io/complete-intro-to-containers/multi-stage-builds

# Build Stage
FROM node:14-alpine as build
WORKDIR /build

# Copia os arquivos do contexto atual (parâmetro path do comando docker build)
# para a WORKDIR no container.
COPY package-lock.json package.json ./
RUN npm update
RUN npm ci
RUN npm i pm2
COPY . .

# Runtime Stage
FROM alpine:latest
RUN apk add --update nodejs
RUN addgroup -S node && adduser -S node -G node
USER node
RUN mkdir /home/node/backend
WORKDIR /home/node/backend
COPY --from=build --chown=node:node /build .
ENV PATH="${PATH}:node_modules/pm2/bin/"
CMD ["pm2-runtime", "app.js"]
