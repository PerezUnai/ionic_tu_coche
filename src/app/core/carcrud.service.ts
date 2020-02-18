import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})

export class CarcrudService {

  cars: any;
  constructor(
    private firestore: AngularFirestore
  ) { }
  create_car(record) {
    return this.firestore.collection('cars').add(record);
  }
  read_cars() {
    return this.firestore.collection('cars').snapshotChanges();
  }
  update_car(recordID, record) {
    this.firestore.doc('cars/' + recordID).update(record);
  }
  delete_car(record_id) {
    this.firestore.doc('cars/' + record_id).delete();
  }
}