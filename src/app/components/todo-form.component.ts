import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Subscription } from 'rxjs';
import { Todo } from '../interfaces/todo';

interface TodoForm
  extends FormGroup<{
    id: FormControl<number>;
    userId: FormControl<number>;
    title: FormControl<string>;
    completed: FormControl<boolean>;
  }> {}

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSlideToggle,
    MatSelectModule,
  ],
  template: `
    <form [formGroup]="todoForm">
      <mat-form-field appearance="outline">
        <mat-label>Id</mat-label>
        <input matInput formControlName="id" class="hidden" />
        <mat-select formControlName="id">
          @for(id of idList; track id) {
          <mat-option [value]="id">{{ id }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>UserId</mat-label>
        <input matInput formControlName="userId" class="hidden" />
        <mat-select formControlName="userId">
          @for(userId of userIdList; track userId) {
          <mat-option [value]="userId">{{ userId }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Title</mat-label>
        <input matInput formControlName="title" />
      </mat-form-field>
      <mat-slide-toggle color="accent" formControlName="completed">
        Completed
      </mat-slide-toggle>
    </form>
  `,
})
export class TodoFormComponent implements OnInit, OnChanges, OnDestroy {
  private readonly fb = inject(NonNullableFormBuilder);
  private idChangeSubscription!: Subscription;
  readonly idList = Array.from({ length: 200 }, (_, i) => i + 1);
  readonly userIdList = Array.from({ length: 20 }, (_, i) => i + 1);
  todoForm!: TodoForm;
  @Input() todo!: Todo;
  @Output() idChange = new EventEmitter<number>();

  ngOnInit(): void {
    this.initTodoForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['todo'] && this.todoForm) {
      this.todoForm.patchValue({ ...this.todo }, { emitEvent: false });
    }
  }

  ngOnDestroy(): void {
    this.idChangeSubscription.unsubscribe();
  }

  private initTodoForm(): void {
    this.todoForm = this.fb.group({
      id: 0,
      userId: 0,
      title: '',
      completed: Boolean(false),
    });
    this.idChangeSubscription =
      this.todoForm.controls.id.valueChanges.subscribe((id) => {
        this.idChange.emit(id);
      });
  }
}
