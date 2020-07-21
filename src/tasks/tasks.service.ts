import { Injectable, Param, Body, NotFoundException, Inject } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ){}

    async findOne(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return found;
    }

    create(createTaskDTO: CreateTaskDTO): Promise<Task> {
        return this.taskRepository.createTask(createTaskDTO);
    }

    async findAll(): Promise<Task[]> {
        return this.taskRepository.find();
    }
    
    async remove(id: string): Promise<void> {
        const result =  await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }
    
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

