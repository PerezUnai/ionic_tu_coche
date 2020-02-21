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

  id: number;
  public car: ICar;
  carForm: FormGroup;
  errorMessage: string;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
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
    this.id = this.activatedroute.snapshot.params['id'];
    this.getCar(this.id);

  }

  getCar(id: number): void {
    this.cardbService.getCarById(id)
      .subscribe(
        (car: ICar) => this.displayCar(car),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayCar(car: ICar): void {
    if (this.carForm) {
      this.carForm.reset();
    }
    this.car = car;

    // Update the data on the form
    this.carForm.patchValue({
      marca: this.car.marca,
      modelo: this.car.modelo,
      image: this.car.image,
      puertas: this.car.puertas,
      precio: this.car.precio
    });
  }

  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Editar Coche',
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
    if (this.carForm.valid) {
      if (this.carForm.dirty) {
        this.car = this.carForm.value;
        this.car.id = this.id;

        this.cardbService.updateCar(this.car)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );


      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.carForm.reset();
    this.router.navigate(['']);
  }
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Eliminar coche',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.cardbService.deleteCar(id).subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
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
