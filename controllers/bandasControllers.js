const db = require('../db/index');
const bandasController = {
    listado: (req, res) => {
        res.render('bandas/listadoBandas', { bandas: db.lista });
    },
    detail: (req, res) => {
        const banda = db.lista.find(banda => banda.id == req.params.id);
        if (!banda) {
            return res.send('No existe una banda con el id ingresado');
        } else {
            res.render('bandas/detalleBanda', { banda });
        }
    },
    busquedaPorGenero: (req, res) => {
        const bandas = db.lista.filter(banda => banda.genero == req.params.genero);
        res.render('bandas/porGenero', { bandas });
    }

}

module.exports = bandasController;