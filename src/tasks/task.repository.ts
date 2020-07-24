import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('task');
        if (status) {
            query.andWhere('task.status = :status', {status: 'OPEN'});
        }
        if (search) {
            query.andWhere('task.status LIKE :search OR  task.description LIKE :search', {search: `%${search}%` });
        }
        const tasks = await query.getMany();
        return tasks;

    }
    
   async createTask(createTaskDTO: CreateTaskDTO, user): Promise<Task> {
        const task = new Task();
        task.title = createTaskDTO.title;
        task.description = createTaskDTO.description;
        task.status = TaskStatus.OPEN;
        task.user = user;
    
    
        await task.save();
        // delete task.user
        return task
    }


}