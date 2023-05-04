import { UserService } from "../application/UserService";

export class UserController {
	constructor(private readonly userService: UserService) {}

	async createUser(userName: string, password: string): Promise<boolean> {
		await this.userService.createUser(userName, password);

		return true;
	}

	async authenticate(userName: string, password: string): Promise<string> {
		return await this.userService.authenticate(userName, password);
	}

	chooseRepository(repository: string): void {
		this.userService.chooseRepository(repository);
	}
}
