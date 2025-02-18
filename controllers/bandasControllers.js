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
    },
    randomCat: async (req, res) => {
        try {
            const url = "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1";
            const headers = {
                "x-api-key": "live_6EqiSEU8yr7y2u2KY8TBM3nQOYxTnMyKglEO1QwPx4BrzIyzYAQjnhbBmg2HpkIQ",
                "content-type": "application/json"
            }
            
            const response = await fetch(url,{headers});
            
            if (!response.ok) {
                throw new Error("Error en la peticion");
            }
            
            const data = await response.json();
            const imagen = data[0].url
            res.render('bandas/randomCat', { imagen });
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = bandasController;