import { Task } from "../../domain/Task";
import TaskRepository from "../../domain/TaskRepository";
import taskMongoModel from "./TaskMongoModel";

export class MongoTaskRepository implements TaskRepository {
	async createTask(task: Task): Promise<Task> {
		const newTask = await taskMongoModel.create(task);

		return newTask;
	}

	async updateTask(id: string, updatedTaskData: Partial<Task>): Promise<boolean> {
		const taskToUpdate = await taskMongoModel.findOneAndUpdate({ uuid: id }, updatedTaskData);

		if (!taskToUpdate) {
			return false;
		}

		return true;
	}

	async deleteTask(id: string): Promise<boolean> {
		const taskToDelete = await taskMongoModel.findById({ uuid: id });

		if (!taskToDelete) {
			return false;
		}

		return true;
	}

	async get(id: string): Promise<Task> {
		const task = await taskMongoModel.findById({ uuid: id });

		if (!task) {
			throw new Error(`Task with id ${id} not found`);
		}

		return task;
	}

	async getUserTasks(userID: string): Promise<Task[]> {
		const tasks = await taskMongoModel.find({ userId: userID });

		return tasks;
	}
}
