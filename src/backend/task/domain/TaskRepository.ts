import { Task } from "./Task";

interface TaskRepository {
	createTask(task: Task): Promise<Task>;
	updateTask(id: string, updatedTaskData: Partial<Task>): Promise<boolean>;
	deleteTask(id: string): Promise<boolean>;
	get(id: string): Promise<Task>;
	getUserTasks(userID: string): Promise<Task[]>;
}

export default TaskRepository;
