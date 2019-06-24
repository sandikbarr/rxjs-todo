import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Doby } from '../models/Doby';
import { DobyHttpService } from '../http/doby-http.service';

@Injectable()
export class DobyStoreService {

  private _dobys: BehaviorSubject<Doby[]> = new BehaviorSubject([]);

  constructor(private dobyAPI: DobyHttpService) {
      this.loadInitialData();
  }

  get dobys(): Observable<Doby[]> {
      return this._dobys.asObservable();
  }

  loadInitialData() {
    this.dobyAPI.getAllDobys()
      .subscribe(
          dobys => {
              this._dobys.next(dobys);
          },
          err => console.log('Error retrieving Dobys')
      );
  }

  addDoby(newDoby: Doby): Observable<Doby> {
    const observable = this.dobyAPI.saveDoby(newDoby);

    observable.subscribe((savedDoby: Doby) =>
      this._dobys.next(this._dobys.getValue().concat([savedDoby]))
    );

    return observable;
  }

  editDoby(doby: Doby): Observable<Doby> {
    const observable = this.dobyAPI.toggleDoby(doby);

    observable.subscribe(() => {
      const dobys = this._dobys.getValue();
      const index = dobys.findIndex((d: Doby) => d.id === doby.id);
      this._dobys.next([
        ...dobys.slice(0, index),
        doby,
        ...dobys.slice(index + 1)
      ]);
    });

    return observable;
  }


  deleteDoby(deleted: Doby): Observable<{}> {
    const observable = this.dobyAPI.deleteDoby(deleted);

    observable.subscribe(() => {
      const dobys: Doby[] = this._dobys.getValue();
      const index = dobys.findIndex((doby) => doby.id === deleted.id);
      this._dobys.next([
        ...dobys.slice(0, index),
        ...dobys.slice(index + 1)
      ]);
    });

    return observable;
  }
}
