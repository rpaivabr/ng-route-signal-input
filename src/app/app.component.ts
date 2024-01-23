import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule],
  template: `
    <mat-toolbar color="primary">
      <span [routerLink]="['/']">{{ title }}</span>
    </mat-toolbar>
    <router-outlet />
  `,
})
export class AppComponent {
  title = 'Todo App';
}
