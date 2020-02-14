import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardbService } from '../core/cardb.service';
import { ICar } from '../share/interfaces';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  id: string;
  public car: ICar;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private cardbService: CardbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedroute.snapshot.params.id;
    this.cardbService.getItem(this.id).then(
      (data: ICar) => this.car = data
    );
  }

  editRecord(car) {
    this.router.navigate(['edit', car.id])
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
