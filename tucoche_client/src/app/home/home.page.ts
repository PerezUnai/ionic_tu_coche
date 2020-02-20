import { Component, OnInit } from '@angular/core';
import { ICar } from '../share/interfaces';
import { CarcrudService } from '../core/carcrud.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public cars: ICar[];

  constructor(private carcrudService: CarcrudService, private route:
    Router) { }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  }

  ngOnInit(): void {
    // If the database is empty set initial values
    this.retrieveValues();
    
  }

  ionViewDidEnter(){
    this.retrieveValues();
  }

  retrieveValues(){
    this.carcrudService.read_cars().subscribe(data => {
      this.cars = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          nombre: e.payload.doc.data()['marca'],
          capacidad: e.payload.doc.data()['puertas'],
          ciudad: e.payload.doc.data()['modelo'],
          image: e.payload.doc.data()['image'],
          precio: e.payload.doc.data()['precio'],
        };
      })
      console.log(this.cars);
    });
  }

  async carTapped(car) {
    this.route.navigate(['details', car.id]);
  }
}


