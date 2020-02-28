const express = require('express');
const bodyParser = require('body-parser');
const app = express();

class Car {
    constructor(
        public id:number,
        public marca:string,
        public modelo:string,
        public image:string,
        public puertas:number,
        public precio:number,
    ){}
}
var products: Car[] = [
    new Car(0, "First","Car", "24.99",3,3424.99),
    new Car(1, "Second","Car", "24.99",5,2435.89),
    new Car(2, "Third","Car", "24.99",5,4524.99),
    new Car(3, "Fourth","Car", "24.99",3,2224.50)
]
function getProducts(): any[] {
    return products;
}

app.use(function (req: any, res: any, next: any) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(bodyParser.json())

app.post('/products', bodyParser.json(), (req: any, res: any) => {

    let pNew = new Car(
      products.length + 1,
      req.body.marca,
      req.body.modelo,
      req.body.image,
      req.body.puertas,
      req.body.precio
    );
    products.push(pNew);
    res.status(200).send({ 
      id: pNew.id,
      marca: pNew.marca,
      modelo: pNew.modelo,
      image: pNew.image,
      puertas: pNew.puertas,
      precio: pNew.precio,
     });
   
  })

app.get('/', (req: any,res: any) =>{
    res.send('The URL of products is 127.0.0.1:8000/products');
});
app.get('/products', (req:any ,res:any) => {
    console.log("me han pedido la lista de coches");
    let lista = getProducts()
    console.log(lista);
    res.json(lista);
});
function getProductsById(productId: number): any {
    let p:any;
    p = products.find(p => p.id == productId);
    return p;
}
app.get('/products/:id', (req:any ,res:any) => {
    res.json(getProductsById(parseInt(req.params.id)));
});

function updateProductsById(req:any, productId: number): any {
    let p: any;
    p = products.find(p => p.id == productId);
    let index = products.indexOf(p);
  
    req.body.marca,
    req.body.modelo,
    req.body.image,
    req.body.puertas,
    req.body.precio
    
    products[index] = p;
    return p;
  }

  app.put('/products/:id', function (req:any, res:any) {
    res.json(updateProductsById(req, parseInt(req.params.id)));
    res.send('Got a UPDATE request at /user');
  });

  function deleteProductsById(productId: number): any {
    let p: any;
    p = products.find(p => p.id == productId);
    let index = products.indexOf(p);
   //delete products[index];
   products.splice(index,1);
    return p;
  }

  app.delete('/products/:id', function (req:any, res:any) {
    res.json(deleteProductsById(parseInt(req.params.id)));
    res.send('Got a DELETE request at /user');
  });

app.post('/postData', bodyParser.json(), (req:any, res:any) => {
    console.log(res.json(req.body));
});

const server = app.listen(8000, "localhost", () => {
    const { address, port } = server.address();
  
    console.log('Listening on %s %s', address, port);
  });