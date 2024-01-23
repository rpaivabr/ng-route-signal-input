import { Routes } from '@angular/router';
import { TodoListComponent } from './pages/todo-list.component';
import { TodoDetailComponent } from './pages/todo-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'todos', component: TodoListComponent },
  { path: 'todos/:id', component: TodoDetailComponent },
  { path: '**', redirectTo: '/todos' },
];
