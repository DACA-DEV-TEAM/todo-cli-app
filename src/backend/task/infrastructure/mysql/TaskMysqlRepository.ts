import { Task } from "../../domain/Task";
import TaskRepository from "../../domain/TaskRepository";
import { TaskMysqlModel } from "./TaskMysqlModel";

export class TaskMysqlRepository implements TaskRepository {
	async createTask(task: Task): Promise<Task> {
		const newTask = await TaskMysqlModel.create(task);

		return newTask;
	}

	async updateTask(id: string, updatedTaskData: Partial<Task>): Promise<boolean> {
		const taskToUpdate = await TaskMysqlModel.update(
			{ ...updatedTaskData },
			{ where: { uuid: id } }
		);

		if (taskToUpdate[0] === 0) {
			return false;
		}

		return true;
	}

	async deleteTask(id: string): Promise<boolean> {
		const taskToDelete = await TaskMysqlModel.destroy({ where: { uuid: id } });

		if (!taskToDelete) {
			return false;
		}

		return true;
	}

	async get(id: string): Promise<Task> {
		const task = await TaskMysqlModel.findOne({ where: { uuid: id } });

		if (!task) {
			throw new Error(`Task with id ${id} not found`);
		}

		return task;
	}

	async getUserTasks(userID: string): Promise<Task[]> {
		const tasks = await TaskMysqlModel.findAll({ where: { userId: userID } });

		return tasks;
	}
}
