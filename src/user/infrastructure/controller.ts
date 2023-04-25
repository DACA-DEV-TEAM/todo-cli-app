import Service from "./service";
//TODO meter path en una variable de entorno

class Controller {
	constructor(private readonly service: Service) {}
	//TODO faltan las verificaciones en las BBDD de la creacion de user
	async createUser(userName: string, password: string): Promise<boolean> {
		await this.service.createUser(userName, password);

		return true;
	}

	async authenticate(userName: string, password: string): Promise<boolean> {
		return await this.service.authenticate(userName, password);
	}

	//TODO faltan las verificaciones en las BBDD de la creacion de task
	async createTask(description: string): Promise<boolean> {
		await this.service.createTask(description);

		return true;
	}

	async listTasks(): Promise<{ id: string; description: string; status: string }[]> {
		return await this.service.userTasks();
	}

	async updateTask(
		idx: string,
		partialTask: { description?: string; status?: string }
	): Promise<boolean> {
		return await this.service.updateTask(idx, partialTask);
	}

	async searchTask(
		id: string
	): Promise<{ description: string; status: string; startTime: string; endTime: string | null }> {
		return await this.service.searchTask(id);
	}

	async deleteTask(id: string): Promise<boolean> {
		return await this.service.deleteTask(id);
	}
}
export default Controller;
