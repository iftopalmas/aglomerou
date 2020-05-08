const db = require('./config')

async function createTable() {
    try {
        await db.connect()
    } catch (error) {
        console.log('Erro ao conectar no banco'+error.stack)
    }finally {
        try {
            await db.query(`
                CREATE TABLE IF NOT EXISTS teste2(
                    id serial PRIMARY KEY,
                    nome VARCHAR(50) UNIQUE NOT NULL
                )
            `)
        } catch (error) {
        console.log("Erro ao criar tabela no banco de dados") 
        }

        await db.end()
    }

}

createTable()