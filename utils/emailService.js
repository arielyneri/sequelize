const { default: nodemailer } = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendVerification = async (email, verificationCode) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verificação do Email - GT4 BEZERRA/TARDE',
        html: `
        <h1>Verificação de E-mail</h1>
        <p>Seu código de verificação é: <strong>${verificationCode}</strong></p>
        <p>Este código expira em 5 minutos</p>
        <p>Se você não solicitou essa verificação, favor desconsidere.</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (e) {
        console.log('Erro: ', e.message);
        return false;
    }
}

module.exports = {
    sendVerification
}