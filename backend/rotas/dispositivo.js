const router = require('express').Router();

const getDispositivo = async(req, res) => {
    //TODO: buscar dados do BD
    res.status(200).json({ id: req.params.id, ativo: true });
};

/**
 * @swagger
 * /dispositivo/{id}:
 *  get: 
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do dispositivo
 *        required: true
 *        type: integer
 *    description: Obtém um dispositivo pelo id
 *    responses:
 *      '200': 
 *        description: Dispositivo obtido com sucesso 
 */
router.get('/:id', getDispositivo);

module.exports = router;
