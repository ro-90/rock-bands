const {readFile,writeFile,parseFile,stringifyFile} = require('../utils/filesystem');
const path = 'db/productos.json';
const { v4: uuidv4 } = require("uuid");

const productsController = {
    list: (req, res) => {
        const products = parseFile(readFile(path));
        res.send(products);
    },
    detail: (req, res) => {
        const id = req.params.id;
        const products = parseFile(readFile(path));
        const product = products.find(product => product.id == id);
        res.send(product);
    },
    create: (req, res) => {
        res.render('products/create');
    },
    store: (req, res) => {
        const product = req.body;
        product.id = uuidv4();
        const products = parseFile(readFile(path));
        products.push(product);
        writeFile(path, stringifyFile(products));
        res.send(product);
    },
    edit: (req, res) => {
        const id = req.params.id;
        const products = parseFile(readFile(path));
        const product = products.find(product => product.id == id);
        res.render('products/update',{product});
    },
    update: (req, res) => {
        //Genero el nuevo producto
        const id = req.params.id;
        const product = req.body;
        product.id = id;

        //Obtengo los productos
        const products = parseFile(readFile(path));
        const indice = products.findIndex(element => element.id == id);
        console.log("indice",indice);
        products[indice] = product;
        writeFile(path, stringifyFile(products));
        res.send(product);
    },
    remove: (req, res) => {
        const id = req.params.id;
        const products = parseFile(readFile(path));
        const filteredProducts = products.filter(product => product.id != id);
        writeFile(path, stringifyFile(filteredProducts));
        res.send(filteredProducts);
    }
}

module.exports = productsController;