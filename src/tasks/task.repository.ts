import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    
   async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        const task = new Task();
        task.title = createTaskDTO.title;
        task.description = createTaskDTO.description;
        task.status = TaskStatus.OPEN;
    
        await task.save();
        return task
    }


}