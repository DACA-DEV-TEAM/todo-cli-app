import TaskStorage from "../../user/domain/interface/TaskStorage";
import { Task } from "../domain/entities/Task";

class service {
	constructor(private _db: TaskStorage) {}

	public set db(db: TaskStorage) {
		this._db = db;
	}

	async createTask(desc: string): Promise<void> {
		const task = new Task(desc);
		await this._db.createTask(task);
	}

	async listTasks(): Promise<Task[]> {
		return await this._db.listTasks();
	}

	async updateTask(id: string, partial: object): Promise<boolean> {
		const partialTask: Partial<Task> = partial;

		return await this._db.updateTask(id, partialTask);
	}

	async searchTask(id: string): Promise<Task> {
		return await this._db.get(id);
	}

	async deleteTask(id: string): Promise<boolean> {
		return await this._db.deleteTask(id);
	}
}

export default service;
