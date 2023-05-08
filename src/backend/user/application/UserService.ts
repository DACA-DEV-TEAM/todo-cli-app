import { UuidService } from "../../shared/application/UuidService";
import { IUserSwitchRepository } from "../domain/IUserSwitchRepository";
import User from "../domain/User";
import { BcryptService } from "./BcryptService";

export class UserService {
	constructor(
		private readonly bcryptService: BcryptService,
		private readonly uuidService: UuidService,
		private readonly userSwitchRepository: IUserSwitchRepository
	) {}

	async chooseRepository(db: string): Promise<void> {
		await this.userSwitchRepository.switchRepository(db);
	}

	async createUser(username: string, password: string): Promise<User> {
		const uuid: string = this.uuidService.UUIDgenerator();
		const hashedPassword: string = await this.bcryptService.encrypt(password); // El número '10' es la cantidad de rondas de salting
		const newUser = await this.userSwitchRepository.create(
			new User(uuid, username, hashedPassword)
		);

		return newUser;
	}

	async authenticate(username: string, password: string): Promise<string> {
		try {
			const user = await this.userSwitchRepository.getUserByUsername(username);

			const isAuth = await this.bcryptService.decrypt(password, user.password);
			if (isAuth) {
				return user.uuid;
			}

			return "";
		} catch (error: unknown) {
			if (process.env.NODE_ENV === "dev") {
				if (error instanceof Error) {
					console.error(error.message);
				} else {
					console.error("An error occurred");
				}
			}

			return "";
		}
	}
}
