const path = require("path");
const directory = path.join(__dirname, "../db/users.json");
const { validationResult } = require("express-validator");
const {
  readFile,
  writeFile,
  parseFile,
  stringifyFile,
} = require("../utils/filesystem");

const users = parseFile(readFile(directory));

const usersControllers = {
  login: (req, res, next) => {
    res.render("users/login", { title: "Login" });
  },
  processLogin: (req, res, next) => {
    const { correo } = req.body;
    const errores = validationResult(req);
    if(errores.array().length > 0){
      res.render("users/login", {
        errores: errores.mapped(),
        correo
      });
    }else{
      const user = users.find(user => user.correo === correo);
      const {nombre} = user;
      req.session.user = {correo, nombre};
      res.cookie("user", req.session.user, {maxAge: 1000 * 60 * 60 * 12});
      res.redirect("/users/profile");
    }

  },
  register: function (req, res, next) {
    res.render("users/register", { title: "registro de usuario" });
  },
  store: function (req, res, next) {
    try {
      const { nombre, correo, contrasena } = req.body;
      const errores = validationResult(req);

      if (errores.array().length > 0) {
        res.render("users/register", {
          errores: errores.mapped(),
          nombre,
          correo,
          contrasena,
        });
      } else {
        users.push({
          nombre,
          correo,
          contrasena,
        });

        writeFile(directory, stringifyFile(users));

        res.redirect("/users/login");
      }
    } catch (error) {
      console.log("el error capturado: ", error);
    }
  },
  profile: (req, res) => {},
};

module.exports = usersControllers;
