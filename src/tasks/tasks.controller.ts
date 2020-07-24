import { Controller, Get, Post, Body, Param, Delete, Put, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private teskService: TasksService) {};

    @Post()
    @UsePipes(ValidationPipe)
    create(
      @Body() createTaskDto: CreateTaskDTO,
      @GetUser() user: User,
    ): Promise<Task> {
      return this.teskService.create(createTaskDto, user);
    }

    @Get()
    getAllTasks(
      @Query(ValidationPipe) filterDto: GetTasksFilterDto,
      @GetUser() user: User,
    ): Promise<Task[]> {
      return this.teskService.getAllTasks(filterDto, user);
    }
  
    @Get(':id')
    findOne(
      @Param('id', ParseIntPipe) id: number,
      @GetUser() user: User,
    ): Promise<Task> {
      return this.teskService.findOne(id, user);
    }
  
    @Delete(':id')
    remove(
      @Param('id', ParseIntPipe) id: number,
      @GetUser() user: User,
    ): Promise<void> {
      return this.teskService.remove(id, user);
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateTaskDto: UpdateTaskDTO,
      @GetUser() user: User,
      ): Promise<Task> {
      return this.teskService.update(id, updateTaskDto, user);
    }
    
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

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.teskService.remove(id);
    // }

    // @Put(':id')
    // update(@Param('id') id: string, @Body() createTaskDTO: CreateTaskDTO) {
    //   return this.teskService.updateTask(id, createTaskDTO);
    // }

}


