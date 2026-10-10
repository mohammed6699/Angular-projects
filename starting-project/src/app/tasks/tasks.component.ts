import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { dummyTasks } from './../services/dummy-tasks';
import { NewTaskComponent } from './new-task/new-task.component';
import { NewTask } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input({required: true}) userId!: string
  @Input({required: true}) userName!: string;
  isAddingTask: boolean = false;
 constructor(
  private taskSer: TasksService
 ){}
  get selctedUserTasks(){
    return this.taskSer.getUserTasks(this.userId)
  }
  onCompleteTask(id: string){
      this.taskSer.removeTask(id)
  }
  onStartAddTask(){
    this.isAddingTask = true
  }
  onCloseAddTask(){
    this.isAddingTask = false
  }

}
