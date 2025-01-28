const express = require('express');
const router = express.Router();

router.get('/list', function(req, res, next) {
    res.render('', { title: 'Express' });
  });

  router.get('/detail', function(req, res, next) {
    res.send('detalle de producto');
  });

    router.get('/create', function(req, res, next) {
        res.send('crear');});


        module.exports = router;