import { Controller, Get, Post, Body, Param, Delete, Put, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private teskService: TasksService) {};
    
    // @Get()
    // @UsePipes(ValidationPipe)
    // GetAllTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    //   if(Object.keys(filterDto).length) {
    //     return this.teskService.getAllTasksWithFilters(filterDto)
    //   } else {
    //     return this.teskService.getAllTasks();
    //   }
    // }
    
    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    //     console.log(createTaskDTO);
    //     return this.teskService.createTask(createTaskDTO);
    // }

    @Get(':id')
    findOneTask(@Param('id', ParseIntPipe) id: number):  Promise<Task> {
        return this.teskService.getTaskById(id);
    }

    
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.teskService.remove(id);
    // }

    // @Put(':id')
    // update(@Param('id') id: string, @Body() createTaskDTO: CreateTaskDTO) {
    //   return this.teskService.updateTask(id, createTaskDTO);
    // }

}


