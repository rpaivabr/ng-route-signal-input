import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-todo-search',
  standalone: true,
  imports: [MatInputModule, MatIconButton, MatIcon],
  template: `
    <form>
      <mat-form-field  appearance="outline">
        <mat-label>Title</mat-label>
        <input matInput [value]="searchText" #search />
        <button
          type="button"
          matSuffix
          mat-icon-button
          (click)="searchChange.emit(search?.value)"
        >
          <mat-icon>search</mat-icon>
        </button>
      </mat-form-field>
    </form>
  `,
})
export class TodoSearchComponent {
  @Input() searchText = '';
  @Output() searchChange = new EventEmitter<string>();
}
