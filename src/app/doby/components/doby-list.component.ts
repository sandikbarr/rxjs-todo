import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
        *ngFor="let doby of dobys"
        [doby]="doby"
        (toggleDoby)="toggleDoby(doby, $event)"
        (deleteDoby)="deleteDoby(doby)">
      </app-doby-list-item>
    </ul>
  `,
  styleUrls: ['doby-list.component.css']
})
export class DobyListComponent implements OnInit, OnDestroy {
  dobys: Doby[];
  dobysSubscription: Subscription;

  constructor (private dobyStore: DobyStoreService) {}

  ngOnInit() {
    this.dobysSubscription = this.dobyStore.dobys.subscribe((dobys: Doby[]) => {
      this.dobys = dobys;
    });
  }

  ngOnDestroy() {
    if (this.dobysSubscription) { this.dobysSubscription.unsubscribe(); }
  }

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
