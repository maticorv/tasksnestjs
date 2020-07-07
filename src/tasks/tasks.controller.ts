import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
    constructor(private teskService: TasksService) {};

    @Get()
    GetAllTasks(): Task[] {
        return this.teskService.getAllTasks();

    }

}


