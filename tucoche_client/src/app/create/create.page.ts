import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CarcrudService } from '../core/carcrud.service';
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
  carMarca: string;
  carModelo: string;
  carImage:string;
  carPuertas:number;
  carPrecio:number;

  constructor(private router: Router,
    private carcrud: CarcrudService,
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
      header: 'Guardar coche',
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
    let record = {};
    record['marca'] = this.car.marca;
    record['modelo'] = this.car.modelo;
    record['puertas'] = this.car.puertas;
    record['image'] = this.car.image;
    record['precio'] = this.car.precio;
    this.carcrud.create_car(record).then(resp => {
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
}


