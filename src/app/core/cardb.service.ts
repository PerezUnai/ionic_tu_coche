import { ICar } from '../share/interfaces';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class CardbService {
  auxCar: ICar;
  auxCarList: ICar[] = [];
  constructor(private storage: Storage) { }
  // Stores a value
  setItem(reference: string, value: ICar) {
    this.storage.set(reference, {
      id: value.id,
      nombre: value.marca,
      ciudad:value.modelo,
      image: value.image,
      capacidad: value.puertas,
      precio:value.precio
    })
      .then(
        (data) => console.log('Stored first item!', data),
        error => console.error('Error storing item', error)
      );
  }
  // Gets a stored item
  getItem(reference): Promise<ICar> {
    return this.storage.get(reference);
  }
  // check if it is empty
  empty() {
    return this.storage.keys()
      .then(
        (data) => { return true },
        error => { return false }
      );
  }
  // Retrieving all keys
  keys(): Promise<string[]> {
    return this.storage.keys();
  }
  // Retrieving all values
  getAll(): Promise<ICar[]> {
    return this.storage.keys().then((k) => {
      k.forEach(element => {
        this.getItem(element).then(
          (data: ICar) => this.auxCarList.push(data)
        );
      });
      return this.auxCarList;
    });
  }
  // Removes a single stored item
  remove(reference: string) {
    this.storage.remove(reference)
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }
  // Removes all stored values.
  clear() {
    this.storage.clear()
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }

}
