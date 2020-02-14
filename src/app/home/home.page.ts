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
  haveValues: boolean = false;

  constructor(private cardbService: CardbService, private route:
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
    if(this.cars !== undefined){
      this.cars.splice(0);
    }
    this.retrieveValues();
  }

  retrieveValues(){
    this.cardbService.getCars().subscribe(
      (data: ICar[]) => {
        this.haveValues = false;
        this.cars = data;
        this.haveValues = true;
      });
  }

  async carTapped(car) {
    this.route.navigate(['details', car.id]);
  }
}


