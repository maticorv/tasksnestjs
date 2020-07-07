import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private teskService: TasksService) {};

    @Get()
    GetAllTasks(){
        return this.teskService.getAllTasks();

    }

}


