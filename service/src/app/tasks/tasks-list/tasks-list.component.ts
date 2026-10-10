import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../Tasks.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  private taskSer = inject(TaskService);
  private selectedFilter = signal<string>('all');
  tasks = computed(() => {
    switch(this.selectedFilter()) {
      case 'all':
        return this.taskSer.allTask();
      case 'open':
        return this.taskSer.allTask().filter(task => task.status === 'OPEN');
      case 'in-progress':
        return this.taskSer.allTask().filter(task => task.status === 'IN_PROGRESS');
      case 'done':
        return this.taskSer.allTask().filter(task => task.status === 'DONE');
      default:
        return this.taskSer.allTask()
    }
  })

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
