require('dotenv/config')

/**
 * Configurações para habilitar Swagger no projeto.
 */
const swaggerDefinition = {
  info: {
    title: "API Aglomerou",
    description: "API REST para o app 'Aglomerou?'."
  },
  servers: ["http://localhost:" + process.env.PORT]
}

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./rotas/*.js"]
};

/**
 * Configura o Swagger UI para a aplicação expressjs.
 * @param {express} app Aplicação express
 */
const setup = app => app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

module.exports = setup;