import { UuidService } from "../../../shared/application/UuidService";
import User from "../domain/User";
import UserRepository from "../domain/UserRepository";
import { BcryptService } from "./BcryptService";

//TODO implmentar la logica de usuario
export class UserService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly bcryptService: BcryptService,
		private readonly uuidService: UuidService
	) {}

	async createUser(username: string, password: string): Promise<User> {
		const uuid: string = this.uuidService.UUIDgenerator();
		const hashedPassword: string = await this.bcryptService.encrypt(password); // El número '10' es la cantidad de rondas de salting
		const newUser = await this.userRepository.create(new User(uuid, username, hashedPassword));

		return newUser;
	}
	//TODO cambiar la validacion del password (userId)

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
