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
 * Obtém os registros de frequência de visitantes em uma determinada área
 * (definida por 2 pontos de coordenadas),
 * agrupados por hora (HOUR), dia (DAY) ou mês (MONTH),
 * de acordo com o valor passado no parâmetro option.
 * @param client instancia do cliente conectado ao banco
 * @param agrupamento frequência com que os dados serão agrupados, podendo ser HOUR, DAY ou MONTH.
 *                    O nome do campo contendo o total de visitantes para a frequência solicitada
 *                    será o nome em minúsculas fornecido para este parâmetro.
 * @param lat1 latitude do canto superior esquerdo da área
 * @param lat2 latitude docanto inferior direito da área
 * @param lng1 longitude do canto superior esquerdo da área
 * @param lng2 longitude do canto inferior direito da área
 * @returns Linhas da tabela agrupadas
 */
exports.selectFrequenciaMediaVisitantas = async (client, agrupamento, lat1, lat2, lng1, lng2) => {
  try {
    if(agrupamento !== 'HOUR' && agrupamento !== 'DAY' & agrupamento !== 'MONTH'){
      throw new Error(`Parâmetro de agrupamento inválido: ${agrupamento}. Informe HOUR, DAY ou MONTH.`)
    }

    const fieldName = agrupamento.toLowerCase();
    const sql = `SELECT uid, EXTRACT(${agrupamento} from data_hora_ultima_atualizacao) as ${fieldName}
                FROM localizacao_dispositivo
                WHERE (latitude BETWEEN $1 AND $2) AND (longitude BETWEEN $3 AND $4)
                GROUP BY 1, 2;`;
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
