const path = require("path");
const directory = path.join(__dirname, "../db/users.json");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const {
  readFile,
  writeFile,
  parseFile,
  stringifyFile,
} = require("../utils/filesystem");
const { v4: uuidv4 } = require("uuid");
const { log } = require("console");

const usersControllers = {
  login: (req, res, next) => {
    res.render("users/login", { title: "Login" });
  },
  processLogin: (req, res, next) => {
    const { correo } = req.body;
    const users = parseFile(readFile(directory));
    const errores = validationResult(req);
    if (errores.array().length > 0) {
      res.render("users/login", {
        errores: errores.mapped(),
        correo,
      });
    } else {
      const user = users.find((user) => user.correo === correo);
      const { nombre, id, avatar } = user;
      console.log(id);

      req.session.user = { correo, nombre, id, avatar };
      console.log("body", req.body);

      if (req.body.recuerdame) {
        res.cookie("user", { correo, nombre, id, avatar }, { maxAge: 1000 * 60 * 30 });
      }
      res.redirect(`/users/profile/${id}`);
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("user");
    res.redirect("/users/login");
  },
  register: function (req, res, next) {
    res.render("users/register", { title: "registro de usuario" });
  },
  store: function (req, res, next) {
    try {
      const users = parseFile(readFile(directory));
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
        bcrypt.hash(contrasena, 10, function (err, hash) {
          if (err) {
            console.log("error en el hash", err);
          }

          users.push({
            id: uuidv4(),
            nombre,
            correo,
            contrasena: hash,
          });

          writeFile(directory, stringifyFile(users));

          res.redirect("/users/login");
        });
      }
    } catch (error) {
      console.log("el error capturado: ", error);
    }
  },
  profile: async (req, res) => {
    const users = parseFile(readFile(directory));
    const id = req.params.id;
    try {
      const user = users.find((user) => user.id === id);
      const response = await fetch("https://apis.datos.gob.ar/georef/api/provincias");
      log("response: ", response);
      if (!response.ok) {
        throw new Error("Hubo un problema con la peticion");
      }
      
      const data = await response.json();
      const provincias = data.provincias;
      log("provincias: ", provincias);
      res.render("users/profile", { title: "Perfil", user, provincias });
    } catch (error) {
      console.log("error: ", error);
      
      res.render("error", error);
    }
  },
  update: (req, res) => {
    console.log("file: ", req.file);

    const users = parseFile(readFile(directory));
    console.log(req.body);
    const id = req.params.id;
    const user = users.find((user) => user.id === id);
    req.body.id = id;
    req.body.avatar = req.file ? req.file.filename : user.avatar;
    if (req.body.contrasena && req.body.contrasena2) {
      req.body.contrasena = bcrypt.hashSync(req.body.contrasena, 10);
    } else {
      req.body.contrasena = user.contrasena;
    }

    delete req.body.contrasena2;

    const index = users.findIndex((user) => user.id === id);
    users[index] = req.body;
    //$2b$10$9dcrAsG4z0Ib78dU/GSyKOFny8bWajoiI7mJnDBmK9UTyc2GEJuUK  
    writeFile(directory, stringifyFile(users));
    res.send(req.body);
  },
};

module.exports = usersControllers;
