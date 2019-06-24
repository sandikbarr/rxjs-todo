import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { Doby } from '../models/Doby';

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable()
export class DobyHttpService {

  constructor(private http: HttpClient) { }

  getAllDobys(): Observable<Doby[]> {
    return this.http.get<Doby[]>('http://localhost:3000/dobys');
  }

  saveDoby(newDoby: Doby): Observable<Doby> {
    return this.http.post<Doby>('http://localhost:3000/dobys', newDoby, {headers}).pipe(share());
  }

  deleteDoby(deletedDoby: Doby): Observable<{}> {
    return this.http.delete('http://localhost:3000/dobys/' + deletedDoby.id, {headers}).pipe(share());
  }

  updateDoby(updatedDoby: Doby): Observable<Doby> {
    return this.http.put<Doby>('http://localhost:3000/dobys/' + updatedDoby.id, updatedDoby, {headers}).pipe(share());
  }
}
