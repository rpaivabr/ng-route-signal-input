import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodosApiService {
  private readonly url = 'https://jsonplaceholder.typicode.com';
  private readonly http = inject(HttpClient);

  getTodos(searchText: string = ''): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(`${this.url}/todos`)
      .pipe(
        map((todos) =>
          searchText
            ? todos.filter((todo) => todo.title.includes(searchText))
            : todos
        )
      );
  }

  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.url}/todos/${id}`);
  }
}
