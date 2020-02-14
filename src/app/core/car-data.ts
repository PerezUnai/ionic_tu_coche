import { InMemoryDbService } from 'angular-in-memory-web-api';

export class CarData implements InMemoryDbService {

  createDb() {
    let cars = [
      {
        id: 1,
        marca: "Coche1",
        modelo: "Azul",
        image: "",
        puertas: 5,
        precio: 2000
      },
      {
        id: 2,
        marca: "Coche2",
        modelo: "Rojo",
        image: "",
        puertas: 3,
        precio: 1790
      },
      {
        id: 3,
        marca: "Coche3",
        modelo: "Verde",
        image: "",
        puertas: 5,
        precio: 1874
      }
    ];
    return { cars: cars };
  }
}
