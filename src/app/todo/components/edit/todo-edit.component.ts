import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../models/Todo';
import { TodoStoreService } from '../../store/todo-store.service';

@Component({
  selector: 'app-todo-edit',
  template: `
    <div>
      <input type="checkbox" [checked]="todo?.completed" (click)="onToggleTodo(!todo.completed)"/>
      <input #todoDesc [value]="todo?.description"/>
    </div>
    <app-todo-tags [tags]="todo?.tags" (tagsChange)="onEditTodo({tags: $event})"></app-todo-tags>
    <app-todo-checklist [checklist]="todo?.checklist" (checklistChange)="onEditTodo({checklist: $event})">
    </app-todo-checklist>
    <button (click)="onEditTodo({description: todoDesc.value}); onSave()">Save</button>
  `,
  styleUrls: ['todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  todo: Todo;

  constructor(private todoStore: TodoStoreService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.todoStore.todos.subscribe((todos: Todo[]) => {
        this.todo = todos.find(todo => todo.id === id);
      });
    });
  }

  onEditTodo(params: {description: string, tags: string[], checklist: {description: string, completed?: boolean}[]}) {
    const { description, tags, checklist } = params;
    this.todoStore.editTodo({...this.todo,
      ...(description && {description}),
      ...(tags && {tags}),
      ...(checklist && {checklist})
    });
  }

  onSave() {
    this.router.navigate(['/todos']);
  }

  onToggleTodo(completed: boolean) {
    this.todoStore.editTodo({...this.todo, completed});
  }
}
