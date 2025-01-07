var express = require('express');
var router = express.Router();
const {login,register,store,profile} = require('../controllers/usersControllers');
const registerValidator = require('../validations/registerValidator');
/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('', { title: 'Express' });
});

router.get('/register',register);

router.post('/register', registerValidator ,store );

router.get('/profile', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
