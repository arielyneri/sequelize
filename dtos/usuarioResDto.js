module.exports = {
    fromEntity: (usuario) => {
        return {
            id: usuario.id,
            email: usuario.email,
            role: usuario.role,
            emailVerificado: usuario.emailVerificado
        }
    }
}