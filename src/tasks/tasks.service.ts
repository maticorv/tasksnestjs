import { Injectable, Param, Body, NotFoundException, Inject } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ){}

    async findOne(id: number, user: User): Promise<Task> {
        const found = await this.taskRepository.findOne({where: {id, userId: user.id}});
        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return found;
    }

    create(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDTO, user);
    }

    getAllTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
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

    async update(id: number, updateTaskDto: UpdateTaskDTO, user: User): Promise<Task> {
        const taskToUpdate = await this.taskRepository.findOne({where: {id, userId: user.id}});
        if (!taskToUpdate) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        taskToUpdate.title = updateTaskDto.title;
        taskToUpdate.description = updateTaskDto.description;

        await taskToUpdate.save();
        return taskToUpdate;

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

