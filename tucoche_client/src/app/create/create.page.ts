import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CardbService } from '../core/cardb.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  errorMessage: string;
  id:number;

  constructor(private router: Router,
    private cardbService: CardbService,
    private activatedroute: ActivatedRoute,
    public toastController: ToastController) { }

  ngOnInit() {
    this.carForm = new FormGroup({
      marca: new FormControl(''),
      modelo: new FormControl(''),
      image: new FormControl(''),
      puertas: new FormControl(''),
      precio: new FormControl(''),
    });
    this.id = parseInt(this.activatedroute.snapshot.params['productId']);
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
    if (this.carForm.valid) {
      if (this.carForm.dirty) {
        this.car = this.carForm.value;
        this.car.id = this.id;
        
        this.cardbService.createCar(this.car)
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
}


