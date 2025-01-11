var express = require('express');
var router = express.Router();
const {login,register,store,profile,processLogin} = require('../controllers/usersControllers');
const registerValidator = require('../validations/registerValidator');
//const validationLogin = require('../middleware/loginVerify');
const loginValidator = require('../validations/loginValidator');
/* GET users listing. */
router.get('/login', login);
router.post('/login', loginValidator, processLogin);

router.get('/register',register);
router.post('/register', registerValidator ,store );

router.get('/profile', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
