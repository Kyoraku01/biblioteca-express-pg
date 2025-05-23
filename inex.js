const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Configura a conexão com o PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false  // Render exige isso para SSL
  }
});

// Rota raiz para teste
app.get('/', (req, res) => {
  res.send('API de Biblioteca com PostgreSQL e Express!');
});

// Rota para listar categorias do banco
app.get('/categorias', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categoria');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar categorias');
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
