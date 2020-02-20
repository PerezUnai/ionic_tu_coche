const express = require('express');
const bodyParser = require('body-parser')

const app = express();
class Car {
    constructor(
        public id:string,
        public marca:string,
        public modelo:string,
        public image:string,
        public puertas:number,
        public precio:number,
    ){}
}
const products = [
    new Car("0", "First","Car", "24.99",3,3424.99),
    new Car("1", "Second","Car", "24.99",5,2435.89),
    new Car("2", "Third","Car", "24.99",5,4524.99),
    new Car("3", "Fourth","Car", "24.99",3,2224.50)
]
function getCars(): Car[] {
    return products;
}
app.get('/', (req: any,res: any) =>{
    res.send('The URL of products is http://localhost:8000/products');
});
app.get('/products', (req:any ,res:any) => {
    res.json(getCars());
});
function getCarsById(productId: string): Car {
    let p:any;
    p = products.find((p:Car) => p.id == productId);
    return p;
}
app.get('/products/:id', (req:any ,res:any) => {
    res.json(getCarsById(req.params.id));
});

app.post('/postData', bodyParser.json(), (req:any, res:any) => {
    console.log(res.json(req.body));
});

const server = app.listen(8000, "localhost", () => {
    const {address, port} = server.address();
    console.log('Listening on %s %s', address, port);
});