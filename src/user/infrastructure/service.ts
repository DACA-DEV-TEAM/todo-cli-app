import bcrypt from "bcrypt";

import User from "../../user/domain/entities/User";
import TaskStorage from "../../user/domain/interface/TaskStorage";
import UserStorage from "../../user/domain/interface/UserStorage";
import { Task } from "../domain/entities/Task";

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
		const user = await this._userDb.getUserByUsername(username);
		const isValidPassword = await bcrypt.compare(password, user.password);

		if (isValidPassword) {
			this._userID = user._id;
		}

		return isValidPassword;
	}

	async createTask(desc: string): Promise<void> {
		const task = new Task(desc, this._userID);
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
