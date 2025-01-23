

//ruta para la creacion de productos
router.get("/list", function (req, res) {
    res.send("la vista de listar");
});

router.get("/detalle/:id", productsController.detail);
//rutas del administrador aplicando middleware
router.get("/create", productsController.create);
// router.post("/create", productsController.store);
router.get("/edit/:id", productsController.edit);
// router.put("/edit/:id", productsController.update);
// router.delete("/delete/:id", productsController.destroy);

module