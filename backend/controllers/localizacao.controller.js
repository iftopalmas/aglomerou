const db = require("../db/config");

exports.getUltimaLocalizacao = (req, res) => {
    //TODO: buscar dados do BD
    res.status(200).json({ idDispositivo: req.params.idDispositivo, latitude: 1, longitude: 2 });
};

exports.inserir = async (req, res) => {
    const idDispositivo = req.params.idDispositivo;
    const lat = req.params.lat;
    const long = req.params.long;

    try {
         const result = await db.query(
             " INSERT INTO localizacao_dispositivo ( id_dispositivo, latitude, longitude) " +
             " VALUES ( $1, $2, $3 )",
             [idDispositivo, lat, long]
         );
         
         res.status(201).send({message: "Local inserido com Sucesso!"});
     } catch (error) {
         if(error.message.includes('fk_localizacao_dispositivo')){
            res.status(401).send({message: "Falha ao inserir localização, dispositivo não cadastrado!"});
        }
        console.error(error.message);
     }
};


