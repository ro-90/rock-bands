var express = require('express');
var router = express.Router();
const {login,register,store,profile,processLogin,logout} = require('../controllers/usersControllers');
const registerValidator = require('../validations/registerValidator');
//const validationLogin = require('../middleware/loginVerify');
const loginValidator = require('../validations/loginValidator');
const loginVerify = require('../middleware/loginValidate');
/* GET users listing. */
router.get('/login',loginVerify, login);
router.post('/login', loginValidator, processLogin);
router.get('/logout', logout);


router.get('/register',register);
router.post('/register', registerValidator ,store );

router.get('/profile/:id', profile);

router.put('/profile/:id', function(req, res, next) {
  console.log("La solicitud de actualizacion:", req.body);
  
  res.send('respondio el metodo de actualizacion');
});

router.delete('/profile/:id', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
