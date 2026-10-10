import { Injectable, signal } from "@angular/core";
import { Task, TaskModel, TaskStatus } from "./task.model";

@Injectable({
    providedIn: 'root'
})

export class TaskService {
    // tasks = [];
    // or use signal
    private tasks = signal<Task[]>([])
    allTask = this.tasks.asReadonly()
    addNewTask(taskData: {title: string, description: string}){
        const newTask: Task = {
            ...taskData,
            id: Math.random().toString(),
            status: 'OPEN'
        }
        this.tasks.update((oldtask) => [...oldtask, newTask])
    }
    updateTaskStatus(taskId: string, newStatus: TaskStatus){
        this.tasks.update((oldTask) => oldTask.map((task) => 
            task.id === taskId ? {...task, status: newStatus} : task
        )
    );
    }
}