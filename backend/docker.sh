#!/bin/bash

IMAGE_NAME="br.edu.ifto/aglomerou-backend:latest"
CONTAINER_NAME="aglomerou-backend"
PORT=8080

if [[ $1 == "build" ]]; then
	# Cria uma imagem Docker para o backend com Node.js,
	# definindo a o contexto (pasta onde onde os arquivos serão copiados)
	# como a pasta atual.
	docker build -f Dockerfile -t $IMAGE_NAME .
elif [[ $1 == "run" ]]; then
	# Executar o container em background (-d)
	docker run --name $CONTAINER_NAME -d -p 80:$PORT -e PORT=$PORT $IMAGE_NAME
elif [[ $1 == "logs" ]]; then	
	docker container logs $CONTAINER_NAME
elif [[ $1 == "remove" ]]; then
	docker rm -f $CONTAINER_NAME
else
	echo "Forma de uso:"
	echo "	$0 build   - Criar container com servidor Node.js para o backend"
	echo "	$0 run     - Iniciar container"
	echo "	$0 logs    - Mostrar logs do container executado"
	echo "	$0 remove  - Excluir container"
fi