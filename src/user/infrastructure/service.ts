import bcrypt from "bcrypt";
import * as dotenv from "dotenv";

import User from "../../user/domain/entities/User";
import TaskStorage from "../../user/domain/interface/TaskStorage";
import UserStorage from "../../user/domain/interface/UserStorage";
import { Task } from "../domain/entities/Task";

dotenv.config();

class service {
	private _userID = "";
	constructor(private _db: TaskStorage, private _userDb: UserStorage) {}

	public set db(db: TaskStorage) {
		this._db = db;
	}

	public set userDb(db: UserStorage) {
		this._userDb = db;
	}

	async createUser(username: string, password: string): Promise<User> {
		const hashedPassword: string = await bcrypt.hash(password, 10); // El número '10' es la cantidad de rondas de salting
		const newUser = await this._userDb.create(new User(username, hashedPassword));

		return newUser;
	}

	async authenticate(username: string, password: string): Promise<boolean> {
		try {
			const user = await this._userDb.getUserByUsername(username);
			const isValidPassword = await bcrypt.compare(password, user.password);

			if (isValidPassword) {
				this._userID = user._id;
			}

			return isValidPassword;
		} catch (error: unknown) {
			if (process.env.NODE_ENV === "dev") {
				if (error instanceof Error) {
					console.error(error.message);
				} else {
					console.error("An error occurred");
				}
			}

			return false;
		}
	}

	async createTask(desc: string): Promise<void> {
		const task = new Task(desc, this._userID);
		await this._db.createTask(task);
	}

	async userTasks(): Promise<Task[]> {
		return await this._db.getUserTasks(this._userID);
	}

	async listTasks(): Promise<Task[]> {
		return await this._db.listTasks();
	}

	async updateTask(id: string, partial: object): Promise<boolean> {
		const partialTask: Partial<Task> = partial;

		return await this._db.updateTask(id, partialTask);
	}

	async searchTask(
		id: string
	): Promise<{ description: string; status: string; startTime: string; endTime: string | null }> {
		const task = await this._db.get(id);
		const parsedObj = {
			description: task.description,
			status: task.status,
			startTime: task.startTime.toLocaleString(),
			endTime: task.endTime ? task.endTime.toLocaleString() : null,
		};

		return parsedObj;
	}

	async deleteTask(id: string): Promise<boolean> {
		return await this._db.deleteTask(id);
	}
}

export default service;
