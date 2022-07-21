const faker = require('faker')
const express = require('express')
const mysql = require('mysql')

const PORT = process.env.APP_PORT || 3000
const app = express()


const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
})

app.get('/', (_, res) => {
  const name = faker.name.findName()

  connection.query(`INSERT INTO people (nome) VALUES ('${name}')`)

  connection.query(`SELECT nome FROM people`, (_, results, __) => {
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ul>
        ${!!results?.length ? results.map(el => `<li>${el.nome}</li>`).join(' ') : ''}
      </li>
    `)
  })
})

app.listen(PORT, () => {
  console.log('Rodando na porta:', PORT);
})