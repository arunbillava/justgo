import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PlaceService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getPlaces(): Observable<any> {
    return this.http.get('/api/places').map(res => res.json());
  }

  countPlace(): Observable<any> {
    return this.http.get('/api/places/count').map(res => res.json());
  }

  addPlace(place): Observable<any> {
    return this.http.post('/api/place', JSON.stringify(place), this.options);
  }

  getPlace(place): Observable<any> {
    return this.http.get(`/api/place/${place._id}`).map(res => res.json());
  }

  editplace(place): Observable<any> {
    return this.http.put(`/api/place/${place._id}`, JSON.stringify(place), this.options);
  }

  deleteplace(place): Observable<any> {
    return this.http.delete(`/api/place/${place._id}`, this.options);
  }

}
