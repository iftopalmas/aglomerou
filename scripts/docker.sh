#!/bin/bash

help()
{
	echo "Forma de uso:"
	echo -e "\t$0 COMANDO backend|database"
	echo -e "\t\t    build        - Criar container"
	echo -e "\t\t    run          - Iniciar container"
	echo -e "\t\t    rerun        - Remove o container em execução, baixa imagem atualizada e executa novamente"
	echo -e "\t\t    logs         - Mostrar logs do container executado"
	echo -e "\t\t    rm ou remove - Excluir container forçadamente (já inclui -f)"
	echo -e "\t\t    push         - Enviar imagem para hub.docker.com"
	echo -e "\t\t    pull         - Baixar imagem de hub.docker.com"
	echo ""
	echo -e "\t$0 COMANDO database"
	echo -e "\t\t    connect      - Conectar ao servidor Postgres no container (requer o psql na máquina host)"
	echo ""

	exit -1
}

if [[ $# -lt 2 ]]; then
	help
fi

env_vars()
{
	# As variáveis do ambiente de produção são usadas
	# apenas quando for rodar o container.
	# Assim, nenhuma informação possivelmente sensível
	# é armazenada dentro do imagem públic em hub.docker.com
	if [[ ! -f .env.production ]]; then
		echo "Arquivo .env.production não foi localizado. Copie a partir de backend/.env" >&2
		exit -1
	fi

	source .env.production
}

if [[ $2 == "backend" ]]; then
	env_vars
	IMAGE_NAME="manoelcampos/aglomerou:backend"
	CONTAINER_NAME="aglomerou-backend"
	if [[ $1 == "build" ]]; then
		# Cria uma imagem Docker para o backend com Node.js,
		# definindo o contexto (pasta onde onde os arquivos serão copiados)
		# como a pasta atual.
		docker build -f ../backend/Dockerfile -t $IMAGE_NAME ../backend || exit -1
		echo ""
		echo "Use $0 run $2 pra iniciar container criado"
	elif [[ $1 == "run" ]]; then
		# Executar o container em background (-d)
		docker run --name $CONTAINER_NAME -d -p $PORT:8080 --env-file .env.production $IMAGE_NAME || exit -1
		echo ""
		echo "Use $0 logs $2 pra exibir os logs do container executado"
	elif [[ $1 == "rerun" ]]; then
		echo "# Removendo container $2"
		eval "$0 rm $2"; echo ""
		echo "# Baixando imagem $2 do Docker Hub"
		eval "$0 pull $2"; echo ""
		echo "# Iniciando novo container $2"
		eval "$0 run $2"
	fi
elif [[ $2 == "database" || $2 == "db" ]]; then
	env_vars
	IMAGE_NAME="manoelcampos/aglomerou:database"
	CONTAINER_NAME="aglomerou-postgres"

	if [[ $1 == "build" ]]; then
		docker build -f ../database/Dockerfile -t $IMAGE_NAME ../database || exit -1
		echo ""
		echo "Use $0 run $2 pra iniciar container criado"
	elif [[ $1 == "run" ]]; then	
		# Executar o container em background (-d)
		docker run -d --name $CONTAINER_NAME \
				-e POSTGRES_USER=$DB_USER -e POSTGRES_PASSWORD=$DB_PASSWORD \
				-p $DB_PORT:5432 $IMAGE_NAME || exit -1
		echo ""
		echo "Use $0 logs $2 pra exibir os logs do container executado"
		echo "Use $0 connect $2 pra conectar ao servidor Postgres no container"
	elif [[ $1 == "connect" ]]; then
		#https://www.postgresql.org/docs/9.1/libpq-envars.html
		PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER $DB_DATABASE 
	fi
else
	help
fi

if [[ $1 == "logs" ]]; then	
	docker container logs $CONTAINER_NAME
elif [[ $1 == "rm" || $1 == "remove" ]]; then
	docker rm -f $CONTAINER_NAME
elif [[ $1 == "push" ]]; then
	docker push $IMAGE_NAME
elif [[ $1 == "pull" ]]; then
	docker pull $IMAGE_NAME
fi

	