import { ICar } from '../share/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CardbService {
  private carsUrl = 'http://127.0.0.1:8000/products';

  constructor(private http: HttpClient) { }

  getCars(): Observable<ICar[]> {
    return this.http.get<ICar[]>(this.carsUrl)
      .pipe(
        tap(data => {
          console.log(JSON.stringify(data))
        }
        ),
        catchError(this.handleError)
      );
  }

  getMaxCarId(): Observable<ICar> {
    return this.http.get<ICar[]>(this.carsUrl)
    .pipe(
      // Get max value from an array
      map(data => Math.max.apply(Math, data.map(function(o) { return o.id; }))   ),
      catchError(this.handleError)
    );
  }

  getCarById(id: number): Observable<ICar> {
    const url = `${this.carsUrl}/${id}`;
    return this.http.get<ICar>(url)
      .pipe(
        tap(data => console.log('getCar: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createCar(car: ICar): Observable<ICar> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    car.id = null;
    return this.http.post<ICar>(this.carsUrl, car, { headers: headers })
      .pipe(
        tap(data => console.log('createCar: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteCar(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.carsUrl}/${id}`;
    return this.http.delete<ICar>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteCar: ' + id)),
        catchError(this.handleError)
      );
  }

  updateCar(car: ICar): Observable<ICar> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.carsUrl}/${car.id}`;
    return this.http.put<ICar>(url, car, { headers: headers })
      .pipe(
        tap(() => console.log('updateCar: ' + car.id)),
        // Return the car on an update
        map(() => car),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
