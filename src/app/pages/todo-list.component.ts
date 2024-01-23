import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { Todo } from '../interfaces/todo';
import { TodosApiService } from '../services/todos-api.service';
import { TodoSearchComponent } from '../components/todo-search.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [RouterLink, MatListModule, TodoSearchComponent],
  template: ` <app-todo-search
      [searchText]="searchText"
      (searchChange)="getTodos($event)"
    />
    <mat-list role="list">
      @for(todo of todos; track todo.id) {
      <mat-list-item
        role="listitem"
        [routerLink]="[todo.id]"
        [class.completed]="todo.completed"
      >
        {{ todo.title }}
      </mat-list-item>
      }
    </mat-list>`,
})
export class TodoListComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly todosService = inject(TodosApiService);
  private todosSubscription = new Subscription();
  searchText = '';
  todos: Todo[] = [];

  ngOnInit(): void {
    this.getTodos();
  }

  ngOnDestroy(): void {
    this.todosSubscription.unsubscribe();
  }

  getTodos(searchText?: string): void {
    this.todosSubscription.add(
      this.todosService.getTodos(searchText).subscribe((todos) => {
        this.todos = todos;
      })
    );
  }

  navigateToQueryByTitle(text: string): void {
    const queryParams = { title: text };
    this.router.navigate(['todos'], { queryParams });
  }
}
