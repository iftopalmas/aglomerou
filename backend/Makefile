all:
	@# Cria uma imagem Docker para o backend com Node.js,
	@# definindo a o contexto (pasta onde onde os arquivos serão copiados)
	@# como a pasta atual.
	docker build -f Dockerfile -t br.edu.ifto/aglomerou-backend:latest .

run:
	@# Executar o container
	docker run -d -p 8080:8080 br.edu.ifto/aglomerou-backend