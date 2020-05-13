backend:
	@# Cria uma imagem Docker para o backend com Node.js,
	@# definindo a o contexto (pasta onde onde os arquivos serão copiados)
	@# como a pasta backend.
	docker build -f backend.Dockerfile -t br.edu.ifto/aglomerou-backend ../backend

run-backend:
	@# Executar o container
	docker run -d -p 8080:8080 br.edu.ifto/aglomerou-backend