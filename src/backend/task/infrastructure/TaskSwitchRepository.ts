/* eslint-disable no-console */
import dotenv from "dotenv";

import connectMongoDB from "../../shared/infrastructure/config/connectMongoDB";
import { sequelize } from "../../shared/infrastructure/config/sequelize";
import { ITaskSwitchRepository } from "../domain/ITaskSwitchReposirtory";
import { Task } from "../domain/Task";
import TaskRepository from "../domain/TaskRepository";
import JsonTaskRepository from "./json/JsonTaskRepository";
import { MongoTaskRepository } from "./mongo/MongoTaskRepository";
import { TaskMysqlRepository } from "./mysql/TaskMysqlRepository";

dotenv.config();

export class TaskSwitchRepository implements ITaskSwitchRepository {
	private taskRepository: TaskRepository;
	constructor(
		private readonly jsonTaskRepository: JsonTaskRepository,
		private readonly mongoTaskRepository: MongoTaskRepository,
		private readonly taskMysqlRepository: TaskMysqlRepository
	) {
		this.taskRepository = jsonTaskRepository;
	}

	public getTaskRepository(): TaskRepository {
		return this.taskRepository;
	}

	async switchRepository(db: string): Promise<TaskRepository> {
		switch (db) {
			case "JSON":
				this.taskRepository = this.jsonTaskRepository;

				return this.taskRepository;

			case "MongoDB":
				try {
					await connectMongoDB();
					this.taskRepository = this.mongoTaskRepository;

					return this.taskRepository;
				} catch (error) {
					console.log(
						"Error: there was a problem connecting to MongoDB. You will be redirected to JSON."
					);

					return this.jsonTaskRepository;
				}
			case "MySQL":
				try {
					await sequelize.authenticate();

					return this.taskMysqlRepository;
				} catch (error) {
					console.log(
						"Error: there was a problem connecting to MySQL. You will be redirected to JSON."
					);

					return this.jsonTaskRepository;
				}

			default:
				return this.jsonTaskRepository;
		}
	}

	async createTask(task: Task): Promise<Task> {
		return this.taskRepository.createTask(task);
	}

	async updateTask(id: string, updatedTaskData: Partial<Task>): Promise<boolean> {
		return this.taskRepository.updateTask(id, updatedTaskData);
	}

	async deleteTask(id: string): Promise<boolean> {
		return this.taskRepository.deleteTask(id);
	}

	async get(id: string): Promise<Task> {
		return this.taskRepository.get(id);
	}

	async getUserTasks(userID: string): Promise<Task[]> {
		return this.taskRepository.getUserTasks(userID);
	}
}
