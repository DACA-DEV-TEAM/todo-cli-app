import User from "../../domain/User";
import UserRepository from "../../domain/UserRepository";
import userMongoModel from "./UserMongoModel";

export class MongoUserRepository implements UserRepository {
	async create(user: User): Promise<User> {
		const newUser = await userMongoModel.create(user);

		return newUser;
	}

	async delete(id: string): Promise<boolean> {
		const user = await userMongoModel.findOneAndDelete({ uuid: id });
		if (user === null) {
			throw new Error("User not found");
		}

		return true;
	}

	async get(id: string): Promise<User> {
		const user = await userMongoModel.findOne({ uuid: id });
		if (user === null) {
			throw new Error("User not found");
		}

		return user;
	}

	async getUserByUsername(username: string): Promise<User> {
		const user = await userMongoModel.findOne({ userName: username });
		if (user === null) {
			throw new Error("User not found");
		}

		return user;
	}

	async update(id: string, updatedUserData: Partial<User>): Promise<boolean> {
		const user = await userMongoModel.findOneAndUpdate(
			{ uuid: id },
			{ $set: updatedUserData },
			{ returnOriginal: false }
		);
		if (user === null) {
			throw new Error("User not found");
		}

		return true;
	}
}
