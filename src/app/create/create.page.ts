import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CardbService } from '../core/cardb.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ICar } from '../share/interfaces';


@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  
  car: ICar;
  carForm: FormGroup;

  constructor(private router: Router,
    private cardbService: CardbService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.carForm = new FormGroup({
      marca: new FormControl(''),
      modelo: new FormControl(''),
      image: new FormControl(''),
      puertas: new FormControl(''),
      precio: new FormControl(''),
    });
  }
  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar Coche',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.saveCar();
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  saveCar() {
    this.car = this.carForm.value;
    let nextKey = this.car.marca.trim();
    this.car.id = nextKey;
    this.cardbService.setItem(nextKey, this.car);
    console.warn(this.carForm.value);
  }
}


