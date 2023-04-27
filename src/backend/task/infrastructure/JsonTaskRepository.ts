import { readJsonFile, writeJsonFile } from "../../../shared/infrastructure/JsonFileUtil";
import { Task } from "../domain/Task";
import TaskRepository from "../domain/TaskRepository";
import { TaskStatus } from "../domain/TaskStatus";

class JsonTaskRepository implements TaskRepository {
	constructor(public path: string) {}

	async createTask(task: Task): Promise<Task> {
		const data = await readJsonFile<Task>(this.path);
		data.push(task);
		await writeJsonFile(this.path, data);

		return task;
	}

	async getUserTasks(userID: string): Promise<Task[]> {
		const data = await readJsonFile<Task>(this.path);
		const userTasks = data.filter((task) => task.userId === userID);

		return userTasks;
	}

	async updateTask(id: string, updatedTaskData: Partial<Task>): Promise<boolean> {
		const data = await readJsonFile<Task>(this.path);
		const taskToUpdate = data.findIndex((task) => task.uuid === id);
		if (taskToUpdate === -1) {
			throw new Error("Not found");
		}
		data[taskToUpdate] = { ...data[taskToUpdate], ...updatedTaskData };
		if (data[taskToUpdate].status === TaskStatus.COMPLETED) {
			data[taskToUpdate].endTime = new Date();
		}

		await writeJsonFile<Task>(this.path, data);

		return true;
	}

	async deleteTask(id: string): Promise<boolean> {
		const data = await readJsonFile<Task>(this.path);
		const task = data.findIndex((task) => task.uuid === id);
		if (task !== -1) {
			data.splice(task, 1);
			await writeJsonFile<Task>(this.path, data);

			return true;
		}
		throw new Error("Task not found");
	}

	async get(id: string): Promise<Task> {
		const data = await readJsonFile<Task>(this.path);
		const task = data.find((task) => task.uuid === id);

		if (task === undefined) {
			throw new Error("Task Not Found");
		}

		return task;
	}
}

export default JsonTaskRepository;
