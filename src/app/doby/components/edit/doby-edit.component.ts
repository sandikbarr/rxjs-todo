import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doby } from '../../models/Doby';
import { DobyStoreService } from '../../store/doby-store.service';

@Component({
  selector: 'app-doby-edit',
  template: `
    <div>
      <input type="checkbox" [checked]="doby?.completed" (click)="onToggleDoby(!doby.completed)"/>
      <input #dobyDesc [value]="doby?.description"/>
    </div>
    <app-doby-tags [tags]="doby?.tags" (tagsChange)="onEditDoby({tags: $event})"></app-doby-tags>
    <app-doby-checklist [checklist]="doby?.checklist" (checklistChange)="onEditDoby({checklist: $event})">
    </app-doby-checklist>
    <button (click)="onEditDoby({description: dobyDesc.value}); onSave()">Save</button>
  `,
  styleUrls: ['doby-edit.component.css']
})
export class DobyEditComponent implements OnInit {
  doby: Doby;

  constructor(private dobyStore: DobyStoreService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.dobyStore.dobys.subscribe((dobys: Doby[]) => {
        this.doby = dobys.find(doby => doby.id === id);
      });
    });
  }

  onEditDoby(params: {description: string, tags: string[], checklist: {description: string, completed?: boolean}[]}) {
    const { description, tags, checklist } = params;
    this.dobyStore.editDoby({...this.doby,
      ...(description && {description}),
      ...(tags && {tags}),
      ...(checklist && {checklist})
    });
  }

  onSave() {
    this.router.navigate(['/doby']);
  }

  onToggleDoby(completed: boolean) {
    this.dobyStore.editDoby({...this.doby, completed});
  }
}
