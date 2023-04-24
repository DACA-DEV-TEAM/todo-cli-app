import { Task } from "../entities/Task";

interface TaskStorage {
	createTask(task: Task): Promise<Task>;
	updateTask(id: string, updatedTaskData: Partial<Task>): Promise<boolean>;
	deleteTask(id: string): Promise<boolean>;
	listTasks(): Promise<Task[]>;
	get(id: string): Promise<Task>;
	getUserTasks(userID: string): Promise<Task[]>;
}

export default TaskStorage;
