import User from "../../domain/User";
import UserRepository from "../../domain/UserRepository";
import { UserMysqlModel } from "./UserMysqlModel";

export class UserMysqlRepository implements UserRepository {
	async create(user: User): Promise<User> {
		const newUser = await UserMysqlModel.create(user);

		return newUser;
	}

	async update(id: string, updatedUserData: Partial<User>): Promise<boolean> {
		const user = await UserMysqlModel.update(
			{ ...updatedUserData },
			{
				where: {
					uuid: id,
				},
			}
		);
		if (user[0] === 0) {
			return false;
		}

		return true;
	}

	async delete(id: string): Promise<boolean> {
		const user = await UserMysqlModel.destroy({ where: { uuid: id } });
		if (user === 0) {
			false;
		}

		return true;
	}

	async get(id: string): Promise<User> {
		const user = await UserMysqlModel.findOne({ where: { uuid: id } });
		if (user === null) {
			throw new Error("User not found");
		}

		return user;
	}

	async getUserByUsername(username: string): Promise<User> {
		const user = await UserMysqlModel.findOne({ where: { userName: username } });
		if (user === null) {
			throw new Error("User not found");
		}

		return user;
	}
}
