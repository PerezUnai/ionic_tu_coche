import { Component, OnInit } from '@angular/core';
import { ICar } from '../share/interfaces';
import { CardbService } from '../core/cardb.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public cars: ICar[];
  caresinit: ICar[] = [
    {
      id: "1",
      marca: "Coche1",
      modelo: "Azul",
      image: "",
      puertas: 5,
      precio: 2000
    },
    {
      id: "2",
      marca: "Coche2",
      modelo: "Rojo",
      image: "",
      puertas: 3,
      precio: 1790
    },
    {
      id: "3",
      marca: "Coche3",
      modelo: "Verde",
      image: "",
      puertas: 5,
      precio: 1874
    }
  ];

  constructor(private cardbService: CardbService, private route:
    Router) { }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  }

  ngOnInit(): void {
    // If the database is empty set initial values
    this.inicialization();
  }
  ionViewDidEnter() {
    // Remove elements if it already has values
    if (this.cars !== undefined) {
      this.cars.splice(0);
    }
    this.retrieveValues();
  }
  inicialization() {
    if (this.cardbService.empty()) {
      this.caresinit.forEach(car => {
        this.cardbService.setItem(car.id, car);
      });
    }
  }
  retrieveValues() {
    // Retrieve values
    this.cardbService.getAll().then(
      (data) => this.cars = data
    );
  }
  async carTapped(car) {
   this.route.navigate(['details', car.id]);
  }
}


