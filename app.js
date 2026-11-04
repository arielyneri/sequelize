const express = require('express');
require('dotenv').config();
const usuarioRoutes = require('./routes/usuarioRoutes.js');
const port = process.env.PORT;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ status: 'ok' })
});

app.use('/usuarios', usuarioRoutes)

app.listen(port, () => {
  console.log(`API servida em: http://localhost:${port}`)
});