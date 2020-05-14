#!/bin/bash

clear

source .env.production
IMAGE_NAME="br.edu.ifto/aglomerou-postgres:latest"
CONTAINER_NAME="aglomerou-postgres"

if [[ $1 == "build" ]]; then
	docker build -f Dockerfile -t $IMAGE_NAME .
	echo ""
	echo "Use $0 run pra iniciar container criado"
elif [[ $1 == "run" ]]; then	
	# Executar o container em background (-d)
	docker run -d --name $CONTAINER_NAME \
		   -e POSTGRES_USER=$DB_USER -e POSTGRES_PASSWORD=$DB_PASSWORD \
		   -p $DB_PORT:$DB_PORT $IMAGE_NAME
	echo "Use $0 connect pra conectar ao servidor Postgres no container criado"
elif [[ $1 == "connect" ]]; then
	#https://www.postgresql.org/docs/9.1/libpq-envars.html
	PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER $DB_DATABASE 
elif [[ $1 == "logs" ]]; then	
	docker container logs $CONTAINER_NAME
elif [[ $1 == "remove" ]]; then
	docker rm -f $CONTAINER_NAME
else	
	echo "Forma de uso:"
	echo "	$0 build   - Criar container com servidor Postgres"
	echo "	$0 run     - Iniciar container"
	echo "	$0 logs    - Mostrar logs do container executado"
	echo "	$0 remove  - Excluir container"
	echo "	$0 connect - Conectar ao servidor Postgres no container criado"
fi
	