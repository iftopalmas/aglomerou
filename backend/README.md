# Aglomerou Backend

Aplicação servidora em Node.js com [expressjs](http://expressjs.com), fornecendo APIs REST para integração entre os outros sub-projetos.
A especificação da API é feita usando [swagger](http://swagger.io),
usando as bibliotecas abaixo:

- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express): gerar a interface gráfica da API com Swagger ![Swagger UI](../swagger-ui.jpg)
- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc): documentar a API utilizando comentários [JSDoc](http://jsdoc.app).


## Gerenciamento dos serviços Google

As informações estão contidas na documentação do [app aqui](../mobile/app).

## Executando servidor localmente

O servidor backend pode ser falcimente executado utilizando o **Docker Compose**. Caso ainda não tenha o **Docker Compose** instalado, basta seguir o tutorial disponível no neste [link](https://docs.docker.com/compose/install/). Além disso, é necessário que o usuário que irá executar o servidor, tenha direitos de execução de comandos do **Docker**, para isso, basta executar o comando abaixo (este é o processo utilizado para sistemas **linux**);

```sh
sudo usermod -aG docker `whoami`
```

Após a instalação e configuração é necessário reiniciar o computador para garantir que as alterações sejam funcionais.

### Configurações adicionais

O arquivo [docker-compose.yml](docker-compose.yml) carrega as configurações básicas do servidor de banco de dados e do servidor de aplicação (servidor *NodeJS*). Este arquivo executa o build dos arquivos ***Dockerfile***, tanto do banco de dados (localizado em [/database/Dockerfile](../database/Dockerfile)), quanto arquivo que se encontra neste diretório ([/backend/Dockerfile](../backend/Dockerfile)). Além disso o arquivo está configurado para executar o servidor de aplicação na **porta 10000**, e o servidor de banco de dados na **porta 10001**, caso seja necessário basta modificar estes números dentro do arquivo para ter estes servidores disponíveis em portas diferentes. Antes de executar o arquivo [docker-compose.yml](docker-compose.yml) ainda é necessário **adicionar a *secret key* do captcha**.

### Executando servidor

Para executar o servidor basta, executar o comando abaixo dentro deste diretório:

```sh
docker-compose up
```

### Utilizando servidor localmente

Com o servidor em execução, as demais aplicações deverão apontar o **endereço IP** do computador local, desta forma, direcionando as requisições ao servidor local. É **fortemente recomendado que seja utilizado o endereço "numérico" (ex: 192.168.0.1:10000), ao invés da representação "*localhost*"**. Desta forma é possível garantir que mesmo as aplicações que estejam sendo executados em dispositivos móveis possam acessar o servidor backend. Também é importante enfatizar que fazendo teste com o aplicativo mobile, foi necessário uma "limpeza completa" do cache do projeto para que a modificação de endereço fosse efetiva. Esse processo deletou as pastas *.expo*, *.expo-shared* e *node_modules* localizados em [/mobile/app](../mobile/app), além de limpar o cache do *yarn* e reinstalar as dependências, como é demonstrado nos comandos abaixo:

```sh
rm -rf .expo .expo-shared node_modules
yarn cache clean
yarn install
yarn start
```
