#!/bin/bash

clear

if [[ $# -lt 2 ]]; then
	echo "Forma de uso:"
	echo -e "\t$0 backend|database comando"
	echo -e "\t\tbuild   - Criar container"
	echo -e "\t\trun     - Iniciar container"
	echo -e "\t\tlogs    - Mostrar logs do container executado"
	echo -e "\t\tremove  - Excluir container"
	echo -e "\t\tpush    - Enviar imagem para hub.docker.com"
	echo -e "\t\tpull    - Baixar imagem de hub.docker.com"
	echo ""
	echo -e "\t$0 database comando"
	echo -e "\t\tconnect - Conectar ao servidor Postgres no container (requer o psql na máquina host)"
	echo ""

	exit -1
fi

if [[ $1 == "backend" ]]; then
	IMAGE_NAME="manoelcampos/aglomerou:backend"
	CONTAINER_NAME="aglomerou-backend"
	PORT=8080

	if [[ $2 == "build" ]]; then
		# Cria uma imagem Docker para o backend com Node.js,
		# definindo o contexto (pasta onde onde os arquivos serão copiados)
		# como a pasta atual.
		docker build -f ../backend/Dockerfile -t $IMAGE_NAME ../backend
	elif [[ $2 == "run" ]]; then
		# Executar o container em background (-d)
		docker run --name $CONTAINER_NAME -d -p 80:$PORT -e PORT=$PORT $IMAGE_NAME
	fi
elif [[ $1 == "database" ]]; then
	# As variáveis do ambiente de produção são usadas
	# apenas quando for rodar o container.
	# Assim, nenhuma informação possivelmente sensível
	# é armazenada dentro do imagem públic em hub.docker.com
	if [[ ! -f .env.production ]]; then
		echo "Arquivo .env.production não foi localizado" >&2
		exit -1
	fi

	source .env.production
	IMAGE_NAME="manoelcampos/aglomerou:database"
	CONTAINER_NAME="aglomerou-postgres"

	if [[ $2 == "build" ]]; then
		docker build -f ../database/Dockerfile -t $IMAGE_NAME ../database
		echo ""
		echo "Use $0 run pra iniciar container criado"
	elif [[ $2 == "run" ]]; then	
		# Executar o container em background (-d)
		docker run -d --name $CONTAINER_NAME \
				-e POSTGRES_USER=$DB_USER -e POSTGRES_PASSWORD=$DB_PASSWORD \
				-p $DB_PORT:$DB_PORT $IMAGE_NAME
		echo "Use $0 connect pra conectar ao servidor Postgres no container criado" >&2
	elif [[ $2 == "connect" ]]; then
		#https://www.postgresql.org/docs/9.1/libpq-envars.html
		PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER $DB_DATABASE 
	fi
else
	echo "Informe backend ou database para construir um desses containers." >&2
	exit -1
fi

if [[ $2 == "logs" ]]; then	
	docker container logs $CONTAINER_NAME
elif [[ $2 == "remove" ]]; then
	docker rm -f $CONTAINER_NAME
elif [[ $2 == "push" ]]; then
	docker push $IMAGE_NAME
elif [[ $2 == "pull" ]]; then
	docker pull $IMAGE_NAME
fi

	