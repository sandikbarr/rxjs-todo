import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Todo } from '../../models/Todo';
import { TodoStoreService } from '../../store/todo-store.service';

@Component({
  selector: 'app-todo-edit',
  template: `
    <ng-container *ngIf="todo$ | async as todo">
      <div>
        <input type="checkbox" [checked]="todo?.completed" (click)="onToggleTodo(todo, !todo.completed)"/>
        <input #todoDesc [value]="todo?.description"/>
      </div>
      <app-todo-tags [tags]="todo?.tags" (tagsChange)="onEditTodo(todo, {tags: $event})"></app-todo-tags>
      <app-todo-checklist [checklist]="todo?.checklist" (checklistChange)="onEditTodo(todo, {checklist: $event})">
      </app-todo-checklist>
      <button (click)="onEditTodo(todo, {description: todoDesc.value}); onSave()">Save</button>
    </ng-container>
  `,
  styleUrls: ['todo-edit.component.css']
})
export class TodoEditComponent {
  todo$: Observable<Todo> = this.route.params.pipe(
    map(params => +params['id']),
    switchMap(id => this.todoStore.getTodoById(id))
  );

  constructor(private todoStore: TodoStoreService,
              private route: ActivatedRoute,
              private router: Router) {}

  onEditTodo(todo: Todo, params: {description: string, tags: string[], checklist: {description: string, completed?: boolean}[]}) {
    const { description, tags, checklist } = params;
    this.todoStore.editTodo({...todo,
      ...(description && {description}),
      ...(tags && {tags}),
      ...(checklist && {checklist})
    });
  }

  onSave() {
    this.router.navigate(['/todo']);
  }

  onToggleTodo(todo: Todo, completed: boolean) {
    this.todoStore.editTodo({...todo, completed});
  }
}
