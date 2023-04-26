import { UserService } from "../application/UserService";

export class UserController {
	constructor(private readonly userService: UserService) {}
	//TODO faltan las verificaciones en las BBDD de la creacion de user
	async createUser(userName: string, password: string): Promise<boolean> {
		await this.userService.createUser(userName, password);

		return true;
	}

	async authenticate(userName: string, password: string): Promise<boolean> {
		return await this.userService.authenticate(userName, password);
	}
}
