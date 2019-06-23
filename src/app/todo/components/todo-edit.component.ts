import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../models/Todo';
import { TodoStoreService } from '../store/todo-store.service';

@Component({
  selector: 'app-todo-edit',
  template: `
    <input type="checkbox" [checked]="todo?.completed" (click)="onToggleTodo(!todo.completed)"/>
    <input #todoInput [value]="todo?.description" (change)="onEditTodo(todoInput.value)"/>
    <button (click)="onEditTodo(todoInput.value)">Save</button>
  `
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

  onEditTodo(description: string) {
    this.todoStore.editTodo({...this.todo, description});
    this.router.navigate(['/todos']);
  }

  onToggleTodo(completed: boolean) {
    this.todoStore.editTodo({...this.todo, completed});
  }
}
