/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
import TaskStorage from "../user/domain/interface/TaskStorage";
import Controller from "../user/infrastructure/controller";
import { inquirerMenu, userMenu } from "./inquirerMenu";
import { showStatusList, showTasks } from "./inquirerTask";
import { confirmOperation, getPassword, pause, readInput } from "./inquireUtils";

class Inquirer {
	constructor(
		private readonly controller: Controller,
		private readonly jsonTaskStorage?: TaskStorage,
		private readonly mysqlTaskStorage?: TaskStorage,
		private readonly mongoTaskStorage?: TaskStorage,
		private isAuthenticated = false
	) {
		this.controller = controller;
	}

	async start(): Promise<void> {
		do {
			this.isAuthenticated = await this.authenticateUser();
			if (!this.isAuthenticated) {
				console.log("Exiting...");

				return;
			}
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
							await this.listTasks();
							break;
						case "3":
							await this.updateTask();
							break;
						case "4":
							await this.searchTask();
							break;
						case "5":
							await this.deleteTask();
							break;
						case "0":
							this.isAuthenticated = false;
							break;
					}
				} catch (error: unknown) {
					if (error instanceof Error) {
						console.log(error.message);
					} else {
						console.log("An error occurred");
					}
				}
				await pause();
			} while (this.isAuthenticated);
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-constant-condition
		} while (true);
	}

	private async authenticateUser(): Promise<boolean> {
		let isAuthenticated = false;

		do {
			const isSignUp = await userMenu();
			if (isSignUp === "exit") {
				break;
			}
			const userName = await readInput("userName: ");
			const password = await getPassword();

			if (isSignUp === "signup") {
				await this.controller.createUser(userName, password);
				console.log("User created successfully!");
			}

			isAuthenticated = await this.controller.authenticate(userName, password);
			if (!isAuthenticated) {
				console.log("Invalid username or password.");
			}
		} while (!isAuthenticated);

		return isAuthenticated;
	}

	private async createTask() {
		const desc = await readInput("description");
		await this.controller.createTask(desc);
	}

	private async listTasks() {
		const taskList = await this.controller.listTasks();
		if (taskList.length !== 0) {
			taskList.forEach((task, i) => {
				const idx = `${i + 1}.`;
				console.log(`${idx} ${task.description} :: ${task.status}`);
			});
		} else {
			console.log("\n There are no task");
		}
	}

	private async updateTask(): Promise<void> {
		const partialTask: { description?: string; status?: string } = {};
		const taskList = await this.controller.listTasks();
		if (taskList.length !== 0) {
			const idx = await showTasks(taskList);
			const confirmDesc = await confirmOperation("Do you want to update description?");
			if (confirmDesc) {
				partialTask.description = await readInput("Add a new description:");
			}
			const confirmStatus = await confirmOperation("Do you want to update status?");

			if (confirmStatus) {
				partialTask.status = await showStatusList();
			}
			!confirmDesc && !confirmStatus
				? console.log("No changes have been made")
				: console.log("Task updated successfully");

			await this.controller.updateTask(idx, partialTask);
		} else {
			console.log("\n There are no task");
		}
	}

	private async searchTask() {
		const taskList = await this.controller.listTasks();
		if (taskList.length !== 0) {
			const idx = await showTasks(taskList);
			const task = await this.controller.searchTask(idx);
			console.log(`
	Description: ${task.description},
	Status: ${task.status},
	Started at: ${task.startTime},
	Ended at: ${task.status !== "Completed" ? "Task still on going" : task.endTime}
	`);
		} else {
			console.log("\n There are no task");
		}
	}

	private async deleteTask() {
		const taskList = await this.controller.listTasks();
		if (taskList.length !== 0) {
			const idx = await showTasks(taskList);
			await this.controller.deleteTask(idx);
		} else {
			console.log("\n There are no task");
		}
	}
}
export default Inquirer;
