import { UuidService } from "../../shared/application/UuidService";
import { Task } from "../domain/Task";
import { TaskSwitchRepository } from "../infrastructure/TaskSwitchRepository";

export class TaskService {
	constructor(
		private readonly taskRepository: TaskSwitchRepository,
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

	async updateTask(id: string, partial: object): Promise<boolean> {
		const partialTask: Partial<Task> = partial;
		partialTask.status !== "Completed"
			? (partialTask.endTime = null)
			: (partialTask.endTime = new Date());

		return await this.taskRepository.updateTask(id, partialTask);
	}

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

	async deleteTask(id: string): Promise<boolean> {
		return await this.taskRepository.deleteTask(id);
	}

	async chooseRepository(db: string): Promise<void> {
		await this.taskRepository.switchRepository(db);
	}
}
