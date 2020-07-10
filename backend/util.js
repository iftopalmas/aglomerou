const db = require("./config/db");
/**
 * Verifica se um valor está dentro de uma determinada faixa
 * @param number número a ser verificado
 * @param min valor mínimo (inclusive)
 * @param max valor máximo (inclusive)
 */
exports.inRange = (number, min, max) => (number - min) * (number - max) <= 0;

/**
 * Verifica se uma latitude ou longitude é menor que outra latitude ou longitude.
 * Os valores devem ser ambos latitudes ou ambos longitude.
 * Retornando true caso o valor 'number1' for menor que 'number2'
 * @param number1 uma latitude ou longitude
 * @param number2 outra latitude ou longitude
 */
exports.isAreaCoordinatesValid = (number1, number2) => number1 < number2;

/**
 * Retorna as linhas da tabela de acordo com o parametro de busca e
 * seguindo a restriçao da area passada atraves da latitude e longitude
 * @param client instancia do cliente conectado ao banco
 * @param option Opção escolhida para cada chamada da funçao(HOUR, DAY, MONTH)
 * @param lat1 Parametro da latitude(canto superior esquerdo)
 * @param lat2 Parametro da latitude(canto inferior direito)
 * @param lng1 Parametro da longitude(canto superior esquerdo)
 * @param lng2 Parametro da longitude(canto inferior direito)
 * @returns Linhas da tabela agrupadas
 */
exports.selectSQLHourDayMonth = async (client, option, lat1, lat2, lng1, lng2) => {
  try {
    let sql;
    switch (option) {
      case 'HOUR':
        sql = `SELECT uid, EXTRACT(HOUR from data_hora_ultima_atualizacao) as horas
                FROM localizacao_dispositivo
                WHERE (latitude BETWEEN $1 AND $2) AND (longitude BETWEEN $3 AND $4)
                GROUP BY 1, 2;`;
        break;
      case 'DAY':
        sql = `SELECT uid, EXTRACT(DAY from data_hora_ultima_atualizacao) as dias
                FROM localizacao_dispositivo
                WHERE (latitude BETWEEN $1 AND $2) AND (longitude BETWEEN $3 AND $4)
                GROUP BY 1, 2;`;
        break;
      default:
        break;
    }
    const { rows } = await client.query(sql, [lat1, lat2, lng1, lng2]);
    return rows;
  } catch (error) {
    this.serverError(error);
  }

};

/**
 * Retorna um HTTP status code 500 para exceções
 * desconhecidas capturadas em um bloco catch.
 * @param response Objeto Response para devolver uma resposta à requisição HTTP
 * @param error Objeto contendo informações sobre o erro capturado, 
 *              que será exibido no console.
 */
exports.serverError = (response, error) => {
  response.status(500).send({ message: "Erro interno do servidor" });
  console.error(error.message, error.stack);
};

exports.validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
