const db = require('./config')

async function insertData() {
    await db.connect()

    const queryTest = "INSERT INTO teste (nome) VALUES ($1)"

    await db.query(queryTest, ['Teste Nome 01'])
    await db.query(queryTest, ['Teste Nome 02'])
    await db.query(queryTest, ['Teste Nome 03'])

    await db.end()

    console.log('Dados inseridos')

}

insertData();