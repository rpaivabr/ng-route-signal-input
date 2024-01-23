import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoFormComponent } from '../components/todo-form.component';
import { Todo } from '../interfaces/todo';
import { TodosApiService } from '../services/todos-api.service';
import { Subscription } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [TodoFormComponent, JsonPipe],
  template: ` <app-todo-form [todo]="todo" (idChange)="getTodo($event)" /> `,
})
export class TodoDetailComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly todosService = inject(TodosApiService);
  private readonly todoSubscriptions = new Subscription();
  id = this.route.snapshot.params['id'];
  todo!: Todo;

  ngOnInit(): void {
    this.getTodo(this.id);
  }

  ngOnDestroy(): void {
    this.todoSubscriptions.unsubscribe();
  }

  getTodo(id: number): void {
    this.todoSubscriptions.add(
      this.todosService.getTodoById(id).subscribe((todo) => {
        this.todo = todo;
      })
    );
  }

  navigateToNewTodo(id: number): void {
    this.router.navigate(['todos', id]);
  }
}
