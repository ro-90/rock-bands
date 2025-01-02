const express = require('express');
const router = express.Router();
const {listado,detail,busquedaPorGenero} = require('../controllers/bandasControllers');

router.get('/', listado );
router.get('/detail/:id', detail);
router.get('/generos/:genero', busquedaPorGenero);

module.exports = router;