const usuarioController = require('../controllers/usuarioController')
const express = require('express');
const router = express.Router();

router.post('/', usuarioController.criarUsuario);
router.get('/', usuarioController.listarUsuarios);
router.post('/solicitar', usuarioController.solicitarVerificacao);
router.post('/verificar', usuarioController.verificarEmail)

module.exports = router;