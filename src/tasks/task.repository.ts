import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    findByName(title: string, description: string) {
        return this.findOne({ title, description });
    }


}