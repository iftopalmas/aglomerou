# Aglomerou? 

Em busca de soluções tecnológicas para a atual pandemia do coronavírus, o presente projeto visa o desenvolvimento de um software para rastrear a localização de pessoas, sem coletar qualquer informação pessoal, incluindo aplicativo para smartphones e aplicação web para monitoramento pelas autoridades públicas. O aplicativo pode ser usado para fornecer informações em tempo real para a população decidir o melhor momento de ir a um estabelecimento. O sistema web pode ser usado para autoridades obterem informações e estatísticas sobre o isolamento social, receber denúncias e dispersar multidões.

O projeto é composto por 3 sub-projetos:

- [backend](backend): backend desenvolvido em Node.js, fornecendo APIs REST para integração entre os outros sub-projetos.
- [frontend](frontend): aplicação web que fornece uma interface gráfica para acesso a estatísticas.
- [mobile](mobile): aplicativo mobile que obtém a localização do usuário de forma automatizada e anônima, enviando ao backend.