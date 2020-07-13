import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
    constructor(private teskService: TasksService) {};
    
    @Get()
    GetAllTasks(): Task[] {
        return this.teskService.getAllTasks();
    }
    
    @Post()
    createTask(@Body() task: Task): Task {
        console.log(task);
        return this.teskService.createTask(task.title, task.description);
    }


}


