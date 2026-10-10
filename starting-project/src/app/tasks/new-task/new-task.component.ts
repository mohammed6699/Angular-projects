import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { NewTask } from '../task/task.model';
import { TasksService } from '../tasks.service';
@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  @Output() close = new EventEmitter<void>();
  @Input({required: true}) userId!: string;
  enteredTitle = '';
  enteredSummary = '';
  entereddueDate = ''
  private taskSer = inject(TasksService);
  cloaseDialog(){
    this.close.emit()
  }
  submitForm(){
    this.taskSer.addTask({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.entereddueDate
    }, this.userId);
    this.close.emit()
  }
}
