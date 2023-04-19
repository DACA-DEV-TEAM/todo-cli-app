import { readJsonFile, writeJsonFile } from "../../util/JsonFileUtil";
import { Task } from "../entities/Task";
import TaskStorage from "../interface/TaskStorage";

class JsonTaskStorage implements TaskStorage {
	constructor(public path: string) {}

	async createTask(task: Task): Promise<Task> {
		const data = await readJsonFile(this.path);
		data.push(task);
		await writeJsonFile(this.path, data);

		return task;
	}

	async updateTask(id: string, updatedTaskData: Partial<Task>): Promise<boolean> {
		const data = await readJsonFile(this.path);
		const taskToUpdate = data.findIndex((task) => task.id === id);
		if (taskToUpdate !== -1) {
			data[taskToUpdate] = { ...data[taskToUpdate], ...updatedTaskData };

			return true;
		}
		throw new Error("Not found");
	}

	async deleteTask(id: string): Promise<boolean> {
		const data = await readJsonFile(this.path);
		const task = data.findIndex((task) => task.id === id);
		if (task !== -1) {
			data.splice(task, 1);
			await writeJsonFile(this.path, data);

			return true;
		}
		throw new Error("Task not found");
	}

	async listTasks(): Promise<Task[]> {
		const data = await readJsonFile(this.path);

		return data;
	}

	async get(id: string): Promise<Task> {
		const data = await readJsonFile(this.path);
		const task = data.find((task) => task.id === id);

		if (task === undefined) {
			throw new Error("Task Not Found");
		}

		return task;
	}
}

export default JsonTaskStorage;
