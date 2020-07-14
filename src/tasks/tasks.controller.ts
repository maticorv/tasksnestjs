import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private teskService: TasksService) {};
    
    @Get()
    GetAllTasks(): Task[] {
        return this.teskService.getAllTasks();
    }
    
    @Post()
    createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
        console.log(createTaskDTO);
        return this.teskService.createTask(createTaskDTO);
    }


}


