import { Injectable, Param, Body, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    
    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getAllTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const {status, search} = filterDto;
    //     let tasks = this.getAllTasks();
    //     if(status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     } 
    //     if(search) {
    //         console.log(tasks.filter(task =>{
    //             task.title === search ||
    //             task.description === search
    //         }));

    //         tasks = tasks.filter(task =>{
    //             task.title === search ||
    //             task.description === search
    //         });
    //     } 
    //     return tasks;
    // }

    // createTask(createTaskDTO: CreateTaskDTO): Task {
    //     const { title, description} = createTaskDTO
    //     const task: Task = {
    //         id : uuidv4(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }

    // findOneTask(id: string): Task {
    //     const task = this.tasks.find( task => task.id == id);
    //     if (!task) {
    //         throw new NotFoundException(`Task with ID ${id} not found`);
    //     }
    //     return task;
    // }

    // remove(@Param('id') id: string) {
    //     const found = this.findOneTask(id);
    //     this.tasks = this.tasks.filter(task => task.id !== found.id)    
    // }

    // updateTask(@Param('id') id: string, @Body() createTaskDTO: CreateTaskDTO): Task {
    //     let tasks = this.getAllTasks();
    //     console.log(createTaskDTO);
    //     let task: Task = tasks.filter(task =>{
    //         task.id === id
    //     })[0];

    //     return task;
    //   }
}

