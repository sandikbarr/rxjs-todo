import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DobyStoreService } from '../store/doby-store.service';
import { Doby } from '../models/Doby';

@Component({
  selector: 'app-doby-list',
  template: `
    <div class="add-doby">
      <app-doby-add-item (addDoby)="addDoby($event)"></app-doby-add-item>
    </div>
    <ul>
      <app-doby-list-item
        *ngFor="let doby of dobys$ | async"
        [doby]="doby"
        (toggleDoby)="toggleDoby(doby, $event)"
        (deleteDoby)="deleteDoby(doby)">
      </app-doby-list-item>
    </ul>
  `,
  styleUrls: ['doby-list.component.css']
})
export class DobyListComponent {
  dobys$: Observable<Doby[]> = this.dobyStore.dobys;

  constructor (private dobyStore: DobyStoreService) {}

  toggleDoby(doby: Doby, completed: boolean) {
    this.dobyStore.editDoby({...doby, completed});
  }

  addDoby(doby: Doby) {
    this.dobyStore.addDoby(doby);
  }

  deleteDoby(doby: Doby) {
    this.dobyStore.deleteDoby(doby);
  }
}
