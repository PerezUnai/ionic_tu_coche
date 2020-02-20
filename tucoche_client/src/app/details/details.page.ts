import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarcrudService } from '../core/carcrud.service';
import { ICar } from '../share/interfaces';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

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

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private cardbService: CarcrudService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.retrieveValues();
  }

  ionViewDidEnter() {
    // Remove elements if it already has values
    this.retrieveValues();
  }

  retrieveValues() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.cardbService.read_cars().subscribe(data => {
      this.cars = data.map(e => {
        if (this.id == e.payload.doc.id) {
            this.id = e.payload.doc.id;
            this.car.id = e.payload.doc.id;
            this.car.marca = e.payload.doc.data()['marca'];
            this.car.puertas = e.payload.doc.data()['puertas'];
            this.car.modelo = e.payload.doc.data()['modelo'];
            this.car.image = e.payload.doc.data()['image'];
            this.car.precio = e.payload.doc.data()['precio'];
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

  editRecord(car) {
    this.router.navigate(['edit', car.id])
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
            this.cardbService.delete_car(id);
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
