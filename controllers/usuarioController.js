const usuarioReqDto = require("../dtos/usuarioReqDto")
const bcrypt = require('bcrypt');
const { Usuario } = require("../models");
const usuarioResDto = require("../dtos/usuarioResDto");

exports.criarUsuario = async (req, res) => {
    try {
        const dados = usuarioReqDto.toEntity(req.body);
        const senhaHash = await bcrypt.hash(dados.senha, 12);
        dados.senha = senhaHash;

        const usuario = await Usuario.create(dados); // sequelize
        res.status(201).json(usuarioResDto.fromEntity(usuario));
    } catch (e) {
        res.status(400).json({ erro: e.message });
    }
}