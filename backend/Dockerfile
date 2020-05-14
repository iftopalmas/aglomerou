# Cria um container usando Multi Stage Builds para reduzir seu tamanho,
# não instalando no container final coisas como o npm.
# https://btholt.github.io/complete-intro-to-containers/multi-stage-builds

# Build Stage
FROM node:14-alpine as build
WORKDIR /build

# Copia os arquivos do contexto atual (parâmetro path do comando docker build)
# para a WORKDIR no container.
# Ver Makefile
COPY package-lock.json package.json ./
RUN npm update
RUN npm ci
COPY . .

# Runtime Stage
FROM alpine:latest
RUN apk add --update nodejs
RUN addgroup -S node && adduser -S node -G node
USER node
RUN mkdir /home/node/backend
WORKDIR /home/node/backend
COPY --from=build --chown=node:node /build .
EXPOSE 8080
CMD ["node", "index.js"]