# Aglomerou? 
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Em busca de soluções tecnológicas para a atual pandemia do coronavírus, 
o Aglomerou te permite contribuir e aumentar a segurança de todos, sem qualquer esforço.

O app está disponível para Android na [Google Play neste link](https://play.google.com/store/apps/details?id=br.edu.ifto.apps.aglomerou).
Você faz o download no seu smartphone, aceita os termos de uso e concorda em fornecer sua localização anonimamente. Ele então mostra em tempo real os pontos de aglomeração ao redor da cidade.

A recomendação durante a pandemia é ficar em casa, para quem pode
ficar. Mas em qualquer momento que você precisar ir a algum lugar
como um supermercado, posto de combustíveis, farmácia ou qualquer outro,
você pode verificar no app se existe aglomeração naquele local.
Caso exista, você pode decidir ir em outro horário e assim contribuir
para reduzir a propagação do coronavírus.

O app não coleta nenhum dado pessoal como seu nome, telefone, email ou qualquer outro dado que te identifique. Ele apenas obtém as coordenadas
geográficas da sua localização e não há qualquer maneira
de nós ou outra pessoa sabermos quem você é.

As únicas informações armazenadas em nosso servidor são estes dados
anônimos. Portanto, não há nenhum risco de vazamento de dados e comprometimento de informações pessoais, pois nós simplesmente não coletamos tais dados em momento algum.

Ajude a combater a COVID utilizando nosso app. Não requer esforço algum, pois você só precisa deixá-lo instalado. E você sempre vai ver uma notificação informando que ele está coletando sua localização, para você ficar ciente o tempo todo e também lembrar de abrir o app quando precisar sair de casa.

Uma reportagem sobre o aplicativo pode ser vista [aqui](https://g1.globo.com/to/tocantins/edicao/2020/07/01/videos-ja-1-edicao-desta-quarta-feira-1-de-julho.ghtml#video-8666242-id).

O projeto é composto por 3 sub-projetos:

- [backend](backend): aplicação servidora desenvolvida em [Node.js](http://nodejs.org), fornecendo APIs REST para integração entre os outros sub-projetos.
- [frontend](frontend): aplicação web em [React](http://reactjs.org) que fornece uma interface gráfica para acesso a relatórios e gráficos estatísticos.
- [mobile](mobile): aplicativo mobile em [React Native](http://reactnative.dev) que obtém a localização do usuário de forma automatizada e anônima, enviando ao backend.

## Vídeos dos Protótipos

- [App Mobile](https://drive.google.com/file/d/1CkydKdvB3q-vc6PkYvnlfATcfdYj68We/view?usp=sharing)
- [Frontend](https://drive.google.com/file/d/1eJZQyIo1edQxaeoPSxnRDijqS0RSrS_M/view?usp=sharing)

## Equipe e Colaboradores

Este projeto só foi possível graças aos colaboradores listados abaixo ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/anabeatrix"><img src="https://avatars1.githubusercontent.com/u/46926584?v=4" width="100px;" alt=""/><br /><sub><b>Ana Beatriz Araujo</b></sub></a><br /><a href="https://github.com/ifto-palmas/aglomerou/commits?author=anabeatrix" title="Code">💻</a> <a href="#design-anabeatrix" title="Design">🎨</a> <a href="#ideas-anabeatrix" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/radaelilucca"><img src="https://avatars2.githubusercontent.com/u/29178479?v=4" width="100px;" alt=""/><br /><sub><b>Lucca Radaeli</b></sub></a><br /><a href="https://github.com/ifto-palmas/aglomerou/commits?author=radaelilucca" title="Code">💻</a> <a href="#design-radaelilucca" title="Design">🎨</a> <a href="#ideas-radaelilucca" title="Ideas, Planning, & Feedback">🤔</a></td>    
    <td align="center"><a href="http://twitter.com/manoelcampos"><img src="https://avatars0.githubusercontent.com/u/261605?v=4" width="100px;" alt=""/><br /><sub><b>Manoel Campos da Silva Filho</b></sub></a><br /><a href="https://github.com/ifto-palmas/aglomerou/commits?author=manoelcampos" title="Code">💻</a> <a href="https://github.com/ifto-palmas/aglomerou/commits?author=manoelcampos" title="Documentation">📖</a> <a href="#infra-manoelcampos" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/ifto-palmas/aglomerou/pulls?q=is%3Apr+reviewed-by%3Amanoelcampos" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/ragirfernando"><img src="https://avatars1.githubusercontent.com/u/47224423?v=4" width="100px;" alt=""/><br /><sub><b>Ragir Fernando</b></sub></a><br /><a href="https://github.com/ifto-palmas/aglomerou/commits?author=ragirfernando" title="Code">💻</a></td>
    <td align="center"><a href="https://silvioantonio.ml"><img src="https://avatars1.githubusercontent.com/u/41794605?v=4" width="100px;" alt=""/><br /><sub><b>Silvio Antonio de Oliveira Junior</b></sub></a><br /><a href="https://github.com/ifto-palmas/aglomerou/commits?author=silvioantonio" title="Code">💻</a> <a href="#security-silvioantonio" title="Security">🛡️</a> <a href="https://github.com/ifto-palmas/aglomerou/commits?author=silvioantonio" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Thanyla"><img src="https://avatars0.githubusercontent.com/u/44912443?v=4" width="100px;" alt=""/><br /><sub><b>Thányla Sales</b></sub></a><br /><a href="https://github.com/ifto-palmas/aglomerou/commits?author=Thanyla" title="Code">💻</a> <a href="#design-Thanyla" title="Design">🎨</a> <a href="#ideas-Thanyla" title="Ideas, Planning, & Feedback">🤔</a> <a href="#video-Thanyla" title="Videos">📹</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/ccmmonteiro"><img src="https://avatars2.githubusercontent.com/u/8394675?v=4" width="100px;" alt=""/><br /><sub><b>ccmmonteiro</b></sub></a><br /><a href="#infra-ccmmonteiro" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="http://palmas.ifto.edu.br"><img src="https://avatars1.githubusercontent.com/u/39141526?v=4" width="100px;" alt=""/><br /><sub><b>Instituto Federal de Educação do Tocantins (IFTO)</b></sub></a><br /><a href="#financial-ifto-palmas" title="Financial">💵</a> <a href="#infra-ifto-palmas" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
  <tr>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

Este projeto segue a especificação [all-contributors](https://github.com/all-contributors/all-contributors). Contribuições de qualquer tipo são bem vindas! Mas veja nosso [Guia de Contribuição](https://github.com/ifto-palmas/aglomerou/blob/master/CONTRIBUTING.md) antes de iniciar.
