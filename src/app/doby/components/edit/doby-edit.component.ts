import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Doby } from '../../models/Doby';
import { DobyStoreService } from '../../store/doby-store.service';

@Component({
  selector: 'app-doby-edit',
  template: `
    <ng-container *ngIf="doby$ | async as doby">
      <div>
        <input type="checkbox" [checked]="doby?.completed" (click)="onToggleDoby(doby, !doby.completed)"/>
        <input #dobyDesc [value]="doby?.description"/>
      </div>
      <app-doby-tags [tags]="doby?.tags" (tagsChange)="onEditDoby(doby, {tags: $event})"></app-doby-tags>
      <app-doby-checklist [checklist]="doby?.checklist" (checklistChange)="onEditDoby(doby, {checklist: $event})">
      </app-doby-checklist>
      <button (click)="onEditDoby(doby, {description: dobyDesc.value}); onSave()">Save</button>
    </ng-container>
  `,
  styleUrls: ['doby-edit.component.css']
})
export class DobyEditComponent {
  doby$: Observable<Doby> = this.route.params.pipe(
    map(params => +params['id']),
    switchMap(id => this.dobyStore.getDobyById(id))
  );

  constructor(private dobyStore: DobyStoreService,
              private route: ActivatedRoute,
              private router: Router) {}

  onEditDoby(doby: Doby, params: {description: string, tags: string[], checklist: {description: string, completed?: boolean}[]}) {
    const { description, tags, checklist } = params;
    this.dobyStore.editDoby({...doby,
      ...(description && {description}),
      ...(tags && {tags}),
      ...(checklist && {checklist})
    });
  }

  onSave() {
    this.router.navigate(['/doby']);
  }

  onToggleDoby(doby: Doby, completed: boolean) {
    this.dobyStore.editDoby({...doby, completed});
  }
}
