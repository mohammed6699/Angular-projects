import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskModel } from './task.model';
import { CardComponent } from '../../shared/card/card.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
    @Input({required: true}) task!: TaskModel
    @Output() complete = new EventEmitter<string>();
    taskCompleted(){
      this.complete.emit(this.task.id)
    }
}
