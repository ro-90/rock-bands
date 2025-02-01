var express = require('express');
var router = express.Router();

const { list, 
        detail, 
        create, 
        store, 
        edit, 
        update, 
        remove
    } = require('../controllers/productsController');

router.get('/list', list);

router.get('/detail/:id', detail);

router.get('/create', create);

router.post('/create', store);

router.get('/edit/:id', edit);

router.put('/edit/:id', update);

router.delete('/remove/:id', remove);

module.exports = router;