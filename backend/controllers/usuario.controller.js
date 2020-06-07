const db = require("../config/db");
const { validateEmail, serverError } = require("../util");

exports.inserir = async (req, res) => {
    const { email, senha } = req.body;
    if (!validateEmail(email)) { 
        const msg = {message: "Um valor válido deve ser passado como EMAIL!"};
        console.log(msg); 
        res.status(422).send(msg); 
        return;
    }
    
    const client = await db.connect();
    try {
        await client.query(
            "INSERT INTO usuario ( email, senha ) VALUES ( $1, crypt($2, gen_salt('bf')) )",
            [ email, senha ]
        );
            
        const msg = { message: "Usuario cadastrado com sucesso!" };
        console.log(msg);
        res.status(201).send(msg);
    } catch (error) {
        if(error.message.includes('usuario_email_key'))
            res.status(409).send({message: "Já existe um usuário com o email informado!"});
        else serverError(res, error);
    } finally{
        client.end();
    }
};

exports.atualizar = async (req, res) => {
    const { id, ativo, email, senha } = req.body;
    if (!validateEmail(email)) {
        const msg = {message: "Um valor válido deve ser passado como EMAIL!"};
        console.log(msg); 
        res.status(422).send(msg); 
        return;
    }

    const client = await db.connect();
    try {
        const resultado = await client.query(
            "UPDATE usuario SET email = $1, ativo = $2, senha = crypt($3, gen_salt('bf')) WHERE id = $4",
            [ email, ativo, senha, id ]
        );

        if (resultado.rowCount > 0){ 
            res.status(204).send({ message: "Usuario Atualizado com sucesso!" }); 
        }
        else { 
            res.status(404).send({message: "Usuário com o id informado não foi encontrado!"}); 
        }
    } catch (error) {
        serverError(res, error);
    } finally{
        client.end();
    }
};

exports.deletar = async (req, res) => {
    const client = await db.connect();
    try {
        const resultado = await client.query( " DELETE FROM usuario WHERE id = $1 ", [ req.params.id ]);
        if(resultado.rowCount > 0)
            res.status(200).send({message: "Usuário deletado!"});
        else res.status(404).send({message: "Usuário com o id informado não foi localizado!"});
    } catch (error) {
        serverError(res, error);
    } finally{
        client.end();
    }
};

