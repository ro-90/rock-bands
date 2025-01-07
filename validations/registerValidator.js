const {body} = require('express-validator');

module.exports = [
    body('nombre').notEmpty().withMessage('El campo no puede estar vacio').bail()
        .isAlpha().withMessage('No se permiten numeros o caracteres especiales').bail()
        .isLength({ min: 5, max: 10 }).withMessage("El minimo de caracters es 5 y el maximo 10").bail(),

    body('contrasena').notEmpty().withMessage('El campo no puede estar vacio').bail()
    .custom((value) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/;
        if (!regex.test(value)) {
            throw new Error('La contraseña debe tener entre 8 y 20 caracteres, incluir una minúscula, una mayúscula, un número y un carácter especial');
        }
    }).bail(),
]