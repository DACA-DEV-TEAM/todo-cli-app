import { Task } from "../../../../src/backend/task/domain/Task";
import TaskRepository from "../../../../src/backend/task/domain/TaskRepository";
import Service from "../../../src/user/infrastructure/service";

class MockStorage implements TaskRepository {
	public _tasks: Task[] = [];
	async createTask(task: Task): Promise<Task> {
		this._tasks.push(task);

		return Promise.resolve(task);
	}

	async listTasks(): Promise<Task[]> {
		return Promise.resolve(this._tasks);
	}

	async updateTask(_id: string, _partial: Partial<Task>): Promise<boolean> {
		return Promise.resolve(true);
	}

	async get(_id: string): Promise<Task> {
		const task = this._tasks.find((task) => task.id === _id);
		if (task === undefined) {
			throw new Error("Task Not Found");
		}

		return Promise.resolve(task);
	}

	async deleteTask(_id: string): Promise<boolean> {
		const task = this._tasks.findIndex((task) => task.id === _id);
		if (task !== -1) {
			this._tasks.splice(task, 1);
		}

		return Promise.resolve(true);
	}
}

describe("Service", () => {
	const mockStorage = new MockStorage();
	const service = new Service(mockStorage);

	it("should create a task", async () => {
		await service.createTask("Task 1");
	});

	it("should list tasks", async () => {
		const tasks = await service.listTasks();
		expect(tasks).toEqual(mockStorage._tasks);
	});

	it("should update a task", async () => {
		const updated = await service.updateTask(mockStorage._tasks[0].id, { description: "Task 1" });
		expect(updated).toEqual(true);
	});

	it("should search a task", async () => {
		const tasks = await service.searchTask(mockStorage._tasks[0].id);
		expect(tasks).toEqual(mockStorage._tasks[0]);
	});

	it("should delete a task", async () => {
		const deleted = await service.deleteTask(mockStorage._tasks[0].id);
		expect(deleted).toEqual(true);
		expect(mockStorage._tasks.length).toEqual(0);
		expect(mockStorage._tasks).toEqual([]);
	});
});
