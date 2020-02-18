import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CarcrudService } from '../core/carcrud.service';
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
  public cars: ICar[];
  car: ICar = {
    id: undefined,
    marca: undefined,
    modelo: undefined,
    puertas: undefined,
    precio: undefined,
    image: undefined
  }
  carForm: FormGroup;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private carcrudService: CarcrudService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.retrieveValues();
    this.carForm = new FormGroup({
      marca: new FormControl(''),
      modelo: new FormControl(''),
      image: new FormControl(''),
      puertas: new FormControl(''),
      precio: new FormControl(''),
    });

  }

  ionViewDidEnter() {
    // Remove elements if it already has values
    this.retrieveValues();
  }

  retrieveValues() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.carcrudService.read_cars().subscribe(data => {
      this.cars = data.map(e => {
        if (this.id == e.payload.doc.id) {
          this.id = e.payload.doc.id;
          this.car.id = e.payload.doc.id;
          this.car.marca = e.payload.doc.data()['marca'];
          this.car.puertas = e.payload.doc.data()['puertas'];
          this.car.modelo = e.payload.doc.data()['modelo'];
          this.car.image = e.payload.doc.data()['image'];
          this.car.precio = e.payload.doc.data()['precio'];
          this.displayProduct(this.car);
          return {
            id: e.payload.doc.id,
            isEdit: false,
            marca: e.payload.doc.data()['marca'],
            puertas: e.payload.doc.data()['puertas'],
            modelo: e.payload.doc.data()['modelo'],
            image: e.payload.doc.data()['image'],
            precio: e.payload.doc.data()['precio'],
          };
        }

      })
      console.log(this.car);
    });
  }

  displayProduct(car: ICar): void {
    if (this.carForm) {
      this.carForm.reset();
    }

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
      header: 'Editar coche',
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
    this.car = this.carForm.value;
    let record = {};
    record['marca'] = this.car.marca;
    record['puertas'] = this.car.puertas;
    record['modelo'] = this.car.modelo;
    record['image'] = this.car.image;
    record['precio'] = this.car.precio;
    this.carcrudService.update_car(this.id, this.car);
  }
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Elimiar coche',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.carcrudService.delete_car(id);
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
