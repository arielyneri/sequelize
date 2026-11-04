const usuarioController = require('../controllers/usuarioController')
const express = require('express');
const router = express.Router();

router.post('/', usuarioController.criarUsuario);

module.exports = router;