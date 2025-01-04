const fs = require("fs");
const path = require("path");
const directory = path.join(__dirname, "../db/users.json");
const getUsers = () => {
  return JSON.parse(fs.readFileSync(directory, "utf-8"));
};

const usersControllers = {
  login: (req, res) => {},
  register: function (req, res, next) {
    res.render("users/register", { title: "registro de usuario" });
  },
  store: function (req, res, next) {
    const { nombre, correo, contrasena } = req.body;
    const errores = {};

    try {
      const users = getUsers();
      
      if (!nombre || !correo || !contrasena) {
        errores.all = "Todos los campos son obligatorios";
      }

      if (nombre.length < 6) {
        errores.nombre = "La longitud minima del nombre es de 6 caracteres";
      }

      if (users.find((user) => user.correo === correo)) {
        errores.correo = "El usuario ya existe";
      }

      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/;
      if (!regex.test(contrasena)) {
        errores.contrasena = "La contraseña debe tener entre 8 y 20 caracteres, incluir una minúscula, una mayúscula, un número y un carácter especial";
      }

      if (Object.keys(errores).length > 0) {
        res.render('users/register', {
          errores,
          nombre,
          correo,
          contrasena,
        });
        return;
      }

      users.push({
        nombre,
        correo,
        contrasena,
      });

      fs.writeFileSync(directory, JSON.stringify(users), "utf-8");
      res.send(users);
    } catch (error) {
      console.log("el error capturado: ",  error);
    }


  },
  profile: (req, res) => {},
};

module.exports = usersControllers;
