import { TaskService } from "../application/TaskService";
//TODO recibir el userId del inquirer
export class TaskController {
	constructor(private readonly taskService: TaskService) {}
	//TODO faltan las verificaciones en las BBDD de la creacion de task
	async createTask(description: string, userId: string): Promise<boolean> {
		await this.taskService.createTask(description, userId);

		return true;
	}

	async listTasks(userId: string): Promise<{ id: string; description: string; status: string }[]> {
		return await this.taskService.userTasks(userId);
	}

	async updateTask(
		idx: string,
		partialTask: { description?: string; status?: string }
	): Promise<boolean> {
		return await this.taskService.updateTask(idx, partialTask);
	}

	async searchTask(
		id: string
	): Promise<{ description: string; status: string; startTime: string; endTime: string | null }> {
		return await this.taskService.searchTask(id);
	}

	async deleteTask(id: string): Promise<boolean> {
		return await this.taskService.deleteTask(id);
	}
}
