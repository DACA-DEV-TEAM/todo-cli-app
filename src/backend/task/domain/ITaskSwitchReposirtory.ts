import TaskRepository from "./TaskRepository";

export interface ITaskSwitchRepository extends TaskRepository {
	switchRepository(db?: string): Promise<TaskRepository>;
}
