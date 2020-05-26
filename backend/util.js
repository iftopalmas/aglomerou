/**
 * Verifica se um valor está dentro de uma determinada faixa
 * @param number número a ser verificado
 * @param min valor mínimo (inclusive)
 * @param max valor máximo (inclusive)
 */
exports.inRange = (number, min, max) => ( number - min ) * ( number - max ) <= 0;

/**
 * Retorna um HTTP status code 500 para exceções
 * desconhecidas capturadas em um bloco catch.
 * @param response Objeto Response para devolver uma resposta à requisição HTTP
 * @param error Objeto contendo informações sobre o erro capturado, 
 *              que será exibido no console.
 */
exports.serverError = (response, error) => {
  response.status(500).send({message: "Erro interno do servidor"});
  console.error(error.message, error.stack);
};