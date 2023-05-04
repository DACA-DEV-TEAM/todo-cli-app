import User from "../../domain/User";
import UserRepository from "../../domain/UserRepository";
import { UserMysqlModel } from "./UserMysqlModel";

export class UserMysqlRepository implements UserRepository {
	async create(user: User): Promise<User> {
		const newUser = await UserMysqlModel.create(user);

		return newUser;
	}

	async update(id: string, updatedUserData: Partial<User>): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

	async delete(id: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

	async get(id: string): Promise<User> {
		throw new Error("Method not implemented.");
	}

	async getUserByUsername(username: string): Promise<User> {
		const user = await UserMysqlModel.findOne({ where: { userName: username } });
		if (user === null) {
			throw new Error("User not found");
		}

		return user;
	}
}
