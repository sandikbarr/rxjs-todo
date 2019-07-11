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
  base = 'http://localhost:3000/dobys';
  search: string;

  constructor(private http: HttpClient) { }

  getDobys(search?: string): Observable<Doby[]> {
    let url;
    if (search || this.search) {
      this.search = search;
      url = this.base + '?q=' + this.search;
    }
    return this.http.get<Doby[]>(url || this.base);
  }

  searchDobys(search: string): Observable<Doby[]> {
    return this.getDobys(search);
  }

  saveDoby(newDoby: Doby): Observable<Doby> {
    return this.http.post<Doby>(this.base, newDoby, {headers}).pipe(share());
  }

  deleteDoby(deletedDoby: Doby): Observable<{}> {
    return this.http.delete(`${this.base}/${deletedDoby.id}`, {headers}).pipe(share());
  }

  updateDoby(updatedDoby: Doby): Observable<Doby> {
    return this.http.put<Doby>(`${this.base}/${updatedDoby.id}`, updatedDoby, {headers}).pipe(share());
  }
}
