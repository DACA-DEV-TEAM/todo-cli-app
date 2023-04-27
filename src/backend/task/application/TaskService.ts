import { UuidService } from "../../../shared/application/UuidService";
import { Task } from "../domain/Task";
import TaskRepository from "../domain/TaskRepository";
//TODO recibir el userId del
//TODO poner uuid a task
export class TaskService {
	constructor(
		private readonly taskRepository: TaskRepository,
		private readonly uuidService: UuidService
	) {}

	async createTask(desc: string, userId: string): Promise<void> {
		const uuid: string = this.uuidService.UUIDgenerator();
		const task = new Task(uuid, desc, userId);
		await this.taskRepository.createTask(task);
	}

	async userTasks(userId: string): Promise<Task[]> {
		return await this.taskRepository.getUserTasks(userId);
	}

	//TODO añadir UserId
	async updateTask(id: string, partial: object): Promise<boolean> {
		const partialTask: Partial<Task> = partial;

		return await this.taskRepository.updateTask(id, partialTask);
	}

	//TODO añadir UserId
	async searchTask(
		id: string
	): Promise<{ description: string; status: string; startTime: string; endTime: string | null }> {
		const task = await this.taskRepository.get(id);
		const parsedObj = {
			description: task.description,
			status: task.status,
			startTime: task.startTime.toLocaleString(),
			endTime: task.endTime ? task.endTime.toLocaleString() : null,
		};

		return parsedObj;
	}

	//TODO añadir UserId
	async deleteTask(id: string): Promise<boolean> {
		return await this.taskRepository.deleteTask(id);
	}
}
