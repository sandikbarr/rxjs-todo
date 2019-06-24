import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Doby } from '../models/Doby';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doby-list-item',
  template: `
    <li>
      <div class="actions">
        <span>
          <input
            [id]="doby.id"
            type="checkbox"
            [checked]="doby.completed"
            (click)="toggleDoby.emit(!doby.completed)"/>
          <label [for]="doby.id">{{ doby.description }}</label>
        </span>
        <span>
          <button (click)="onEditDoby()">Edit</button>
          <button (click)="deleteDoby.emit()">Delete</button>
        </span>
      </div>
      <div *ngIf="doby.tags" class="tags">
        <span class="tag" *ngFor="let tag of doby.tags">{{tag}}</span>
      </div>
    </li>
  `,
  styleUrls: ['doby-list-item.component.css']
})
export class DobyListItemComponent {
  @Input() doby: Doby;
  @Output() toggleDoby = new EventEmitter<boolean>();
  @Output() deleteDoby = new EventEmitter();

  constructor(private router: Router) {}

  onEditDoby() {
    this.router.navigate(['/doby', this.doby.id]);
  }
}
