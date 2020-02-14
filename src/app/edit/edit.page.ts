import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CardbService } from '../core/cardb.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ICar } from '../share/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  id: string;
  public car: ICar;
  carForm: FormGroup;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private cardbService: CardbService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.cardbService.getItem(this.id).then(
      (data: ICar) => {
        this.car = data;
        this.displayProduct(this.car);
      });
    this.carForm = new FormGroup({
      nombre: new FormControl(''),
      ciudad: new FormControl(''),
      image: new FormControl(''),
      capacidad: new FormControl(''),
      precio: new FormControl(''),
    });
  
  }

  displayProduct(car: ICar): void {
    if (this.carForm) {
      this.carForm.reset();
    }
    this.car = car;

    // Update the data on the form
    this.carForm.patchValue({
      nombre: this.car.marca,
      ciudad: this.car.modelo,
      image: this.car.image,
      capacidad: this.car.puertas,
      precio: this.car.precio
    });
  }

  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Editar Car',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'create',
          text: 'ACEPTAR',
          handler: () => {
            this.editCar();
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


  editCar() {
    this.cardbService.remove(this.car.id);
    this.car = this.carForm.value;
    let nextKey = this.car.marca.trim();
    this.car.id = nextKey;
    this.cardbService.setItem(nextKey, this.car);
    console.warn(this.carForm.value);
    this.cardbService.remove(this.car.id);
  }
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Elimiar car',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.cardbService.remove(id);
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
}
