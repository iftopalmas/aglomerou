# Aplicativo Mobile React Native usando expo

O projeto foi gerado com o [expo.io](https://expo.io). Para compilá-lo é necessário a instalação 
das ferramentas pelo script [install.sh](../install.sh).

Para testar o app em smartphones Android, é preciso baixar o [Expo App](https://play.google.com/store/apps/details?id=host.exp.exponent).

## Iniciar Emulador Android

Se tiver o Android SDK instalado e a variável de ambiente `$ANDROID_SDK`
definida no seu sistema operacional para apontar para a pasta raiz do SDK,
pode iniciar o emulador pela linha de comando.
Mas para isso, você deve ter criado uma imagem de algum dispositivo Android (Android Virtual Device - AVD).
Pode fazer isso pelo Android Studio, por exemplo.

Depois de ter criado ao menos um AVD, você pode listar os AVDs disponíveis com:

```bash
yarn run list-emulator 
```

Para rodar uma das imagens pode executar:

```bash
yarn run emulator NOME_DA_IMAGEM
```

Você pode criar um arquivo `mobile/app/.npmrc` para definir a imagem padrão ser executada,
pois depende das imagens e nome que utilizou ao criá-las no seu computador.
O `.npmrc` pode ter o conteúdo como: 

```bash
AVDNAME=NOME_DA_IMAGEM_DO_DISPOSITIVO_ANDROID_QUE_DESEJA_RODAR_NO_SEU_PC
```

## Iniciar o projeto no ambiente de desenvolvimento

```bash
expo start
```

## Gerenciamento dos serviços Google

A chave de API do Google Maps é gerenciada pelo [Google Cloud Platform (GCP)](https://console.cloud.google.com) e a chave do [reCAPTCHA tem um console de administração próprio](https://www.google.com/recaptcha/admin). Todas os serviços são gerenciados usando a conta de email do projeto.