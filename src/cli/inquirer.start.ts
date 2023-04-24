import TaskStorage from "../user/domain/interface/TaskStorage";
import Controller from "../user/infrastructure/controller";
import { inquirerMenu } from "./inquirerMenu";
import { pause, readInput } from "./inquireUtils";

class Inquirer {
	constructor(
		private readonly controller: Controller,
		private readonly jsonTaskStorage?: TaskStorage,
		private readonly mysqlTaskStorage?: TaskStorage,
		private readonly mongoTaskStorage?: TaskStorage
	) {
		this.controller = controller;
	}

	async start(): Promise<void> {
		let opt = "";
		do {
			console.clear();
			opt = await inquirerMenu();
			try {
				switch (opt) {
					case "1":
						await this.createTask();
						break;
					case "2":
						await listTasks();
						break;
					/* case "3":
						await updateTask();
						break;
					case "4":
						await searchTask();
						break;
					case "5":
						await deleteTask();
						break; */
				}
			} catch (error: unknown) {
				if (error instanceof Error) {
					console.log(error.message);
				} else {
					console.log("An error occurred");
				}
			}
			await pause();
		} while (opt !== "0");
	}

	private async createTask() {
		const desc = await readInput("description");
		await this.controller.createTask(desc);
	}

	private async listTasks() {

    }
}
export default Inquirer;
