import { ResolveFn, Routes } from '@angular/router';

import { NewTaskComponent, canLeaveEditPage } from '../tasks/new-task/new-task.component';
import { inject } from '@angular/core';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/task/task.model';

const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRouteSnapshot,
  routerState
) => {
  const order = activatedRouteSnapshot.queryParams['order'];
  const tasksService = inject(TasksService);
  const tasks = tasksService
    .allTasks()
    .filter(
      (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId')
    );

  if (order && order === 'asc') {
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  }

  return tasks.length ? tasks : [];
};


export const routes: Routes = [
  {
    path: '',
    children: [
      {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
    providers: [TasksService]
    },
      {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        loadComponent: () => import('../tasks/tasks.component').then(x => x.TasksComponent),
        runGuardsAndResolvers: 'always',
        resolve: {
          userTasks: resolveUserTasks,
        },
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage]
      },
    ]
  }
  
];
