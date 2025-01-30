const express = require('express');
const router = express.Router();
const {listado,detail,busquedaPorGenero,randomCat} = require('../controllers/bandasControllers');

router.get('/', listado );
router.get('/detail/:id', detail);
router.get('/generos/:genero', busquedaPorGenero);
router.get('/randomcat', randomCat );

module.exports = router;