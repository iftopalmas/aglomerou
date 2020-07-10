#!/bin/bash

# Faz build local do apk da aplicação Android usando Turtle cli.
# https://docs.expo.io/distribution/turtle-cli/

clear

#O javac manda o número da versão para a saída de erro
JDK_VERSION=`javac -version 2>&1 | cut -d' ' -f2`
if [[ $? -eq 0 ]]; then
    if echo $JDK_VERSION | grep "1.8" > /dev/null; then
        echo "javac $JDK_VERSION"
    else
        echo "É preciso o JDK 8 instalado mas foi encontrado o $JDK_VERSION" >&2
        echo -e "Se você tem o sdkman, tente um comando como:\n\tsdk use java 8.0.252-zulu"
        exit -1
    fi
else
    echo "É preciso o JDK 8 instalado e nenhum JDK foi encontrado" >&2
    exit -1
fi

(echo -e "yarn \c" && yarn --version) || (echo "É preciso instalar o yarn. Veja https://github.com/ifto-palmas/aglomerou/issues/147" >&2 && exit -1)
(echo -e "turtle-cli \c" && turtle --version)  || yarn global add turtle-cli 
(echo -e "expo-cli \c" && expo --version)  || yarn global add expo-cli
echo ""

ENV_FILE=".env.production"
# Criar variáveis de ambiente
source $ENV_FILE

echo "$REACT_NATIVE_ADDRESS_API_AGLOMEROU"

# O react-native-dotenv tem um bug.
# Quando o arquivo .env é atualizado,
# é preciso editar algum arquivo que importa o módulo
# para que o .env seja lido novamente 
# (isto é mostrado na página inicial do projeto no GitHub).
# O touch aqui é uma tentativa de evitar tal problema
# ao gerar o APK 🙏
touch app.config.js

if [[ -z "$EXPO_ANDROID_KEYSTORE_PASSWORD" ]]; then
    echo "Variável EXPO_ANDROID_KEYSTORE_PASSWORD não encontrada no arquivo $ENV_FILE" >&2
    exit -1
fi;

if [[ -z "$EXPO_ANDROID_KEY_PASSWORD" ]]; then
    echo "Variável EXPO_ANDROID_KEY_PASSWORD não encontrada no arquivo $ENV_FILE" >&2
    exit -1
fi;

if [[ -z "$EXPO_KEYSTORE_ALIAS" ]]; then
    echo "Variável EXPO_KEYSTORE_ALIAS não encontrada no arquivo $ENV_FILE. Copie o valor dela abaixo e adiciona no arquivo." >&2
    # Descobrir o local onde a chave para assinar o APK foi gerada, para usar no comando seguinte.
    # Todas as informações solicitadas no próximo comando são obtidas com este aqui.
    expo fetch:android:keystore

    exit -1
fi;

if [[ -z "$EXPO_USERNAME" ]]; then
    echo "Variável EXPO_USERNAME com o login da sua conta no http://expo.io não foii encontrada no arquivo $ENV_FILE." >&2
    exit -1
fi;

if [[ -z "$EXPO_PASSWORD" ]]; then
    echo "Variável EXPO_PASSWORD com a senha da sua conta no http://expo.io não foi encontrada no arquivo $ENV_FILE." >&2
    exit -1
fi;

turtle setup:android

expo publish

turtle build:android -t apk \
       --keystore-path ./Aglomerou.jks \
       --keystore-alias $EXPO_KEYSTORE_ALIAS -c app.config.js \
       -u $EXPO_USERNAME -p $EXPO_PASSWORD
