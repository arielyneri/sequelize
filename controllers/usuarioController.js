const usuarioReqDto = require("../dtos/usuarioReqDto")
const bcrypt = require('bcrypt');
const { Usuario } = require("../models");
const usuarioResDto = require("../dtos/usuarioResDto");
const crypto = require('crypto');
const { sendVerification } = require("../utils/emailService");

exports.criarUsuario = async (req, res) => {
    try {
        const dados = usuarioReqDto.toEntity(req.body);
        const usuarioExistente = await Usuario.findOne({ where: {email: dados.email}});
        if (usuarioExistente){
            res.status(409).json({ erro: 'Já existe um usuário com esse e-mail!'})
        }
        const senhaHash = await bcrypt.hash(dados.senha, 12);
        dados.senha = senhaHash;

        const usuario = await Usuario.create(dados); // sequelize
        res.status(201).json(usuarioResDto.fromEntity(usuario));
    } catch (e) {
        res.status(400).json({ erro: e.message });
    }
}

exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll(); // sequelize
        const resultado = usuarios.map(usuarioResDto.fromEntity);
        res.json(resultado);
    } catch (e) {
        res.status(400).json({ erro: e.message });
    }
}

exports.solicitarVerificacao = async (req, res) => {
    try {
        const { email } = req.body;
        const usuario = await Usuario.findOne({ where: {email} });
        if(!usuario){
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }
        if(usuario.emailVerificado){
            return res.status(400).json({ erro: 'Email já verificado.' })
        }

        const codigoVerificacao =  crypto.randomInt(100000, 999999).toString();
        const codigoExpericacao = new Date(Date.now() + 5 * 60 * 1000);

        await usuario.update({
                codigoVerificacao,
                codigoExpericacao
        });

        const emailEnviado = sendVerification(email, codigoVerificacao);
        if(!emailEnviado){
            return res.status(400).json({ erro: 'Erro ao enviar verificação!' });
        }
        res.json({ message: 'Código de verificação enviado!' });
    } catch (e) {
        res.status(400).json({ erro: e.message });
    }
}

exports.verificarEmail = async  (req, res) => {
    try {
        const { email, codigo } = req.body;
        const usuario = await Usuario.findOne( { where: {email} });

        if(!usuario){
            res.status(404).json({ erro: 'Usuário não encontrado.' });
        }
        if(usuario.emailVerificado){
            return res.status(400).json({ erro: 'Usuário já verificado.' });
        }
        if(usuario.codigoVerificacao !== codigo){
            return res.status(401).json({ erro: 'Código inválido.' });
        }
        if(new Date() > usuario.codigoExpericacao){
            return res.status(401).json({ erro: 'Código expirado.'});
        }

        await usuario.update({
            emailVerificado: true,
            codigoVerificacao: null,
            codigoExpericacao: null
        });
        res.json({ message: 'Email verificado com sucesso!' });
    } catch (e) {
        res.status(400).json({ erro: e.message });
    }
}