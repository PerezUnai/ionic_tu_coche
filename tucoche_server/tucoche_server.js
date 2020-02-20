"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
class Car {
    constructor(id, marca, modelo, image, puertas, precio) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.image = image;
        this.puertas = puertas;
        this.precio = precio;
    }
}
const products = [
    new Car("0", "First", "Car", "24.99", 3, 3424.99),
    new Car("1", "Second", "Car", "24.99", 5, 2435.89),
    new Car("2", "Third", "Car", "24.99", 5, 4524.99),
    new Car("3", "Fourth", "Car", "24.99", 3, 2224.50)
];
function getCars() {
    return products;
}
app.get('/', (req, res) => {
    res.send('The URL of products is http://localhost:8000/products');
});
app.get('/products', (req, res) => {
    res.json(getCars());
});
function getCarsById(productId) {
    let p;
    p = products.find((p) => p.id == productId);
    return p;
}
app.get('/products/:id', (req, res) => {
    res.json(getCarsById(req.params.id));
});
app.post('/postData', bodyParser.json(), (req, res) => {
    console.log(res.json(req.body));
});
const server = app.listen(8000, "localhost", () => {
    const { address, port } = server.address();
    console.log('Listening on %s %s', address, port);
});
