FROM node:14-alpine
# https://nodejs.org/fr/docs/guides/nodejs-docker-webapp/
# Copia os arquivos do contexto atual (parâmetro path do comando docker build)
# para a pasta backend no container.
# Ver Makefile
COPY . /backend
WORKDIR /backend
RUN npm install
EXPOSE 8080
CMD npm start