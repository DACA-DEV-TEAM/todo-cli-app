import { UuidService } from "../../shared/application/UuidService";
import User from "../domain/User";
import UserRepository from "../domain/UserRepository";
import { BcryptService } from "./BcryptService";
import { UserSwitchRepository } from "./UserSwitchRepository";

export class UserService {
	private userRepository: UserRepository;
	constructor(
		private readonly bcryptService: BcryptService,
		private readonly uuidService: UuidService,
		private readonly userSwitchRepository: UserSwitchRepository
	) {
		this.userRepository = this.userSwitchRepository.switchRepository();
	}

	chooseRepository(db: string): void {
		this.userRepository = this.userSwitchRepository.switchRepository(db);
	}

	async createUser(username: string, password: string): Promise<User> {
		const uuid: string = this.uuidService.UUIDgenerator();
		const hashedPassword: string = await this.bcryptService.encrypt(password); // El número '10' es la cantidad de rondas de salting
		const newUser = await this.userRepository.create(new User(uuid, username, hashedPassword));

		return newUser;
	}

	async authenticate(username: string, password: string): Promise<string> {
		try {
			const user = await this.userRepository.getUserByUsername(username);

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
