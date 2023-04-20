/* eslint-disable no-await-in-loop */
import {
	createTask,
	deleteTask,
	listTasks,
	searchTask,
	updateTask,
} from "./user/infrastructure/controller";
import { inquirerMenu, pause } from "./user/infrastructure/inquirer/inquirerMenu";

const main = async () => {
	let opt = "";
	do {
		console.clear();

		opt = await inquirerMenu();
		switch (opt) {
			case "1":
				await createTask();
				break;
			case "2":
				await listTasks();
				break;
			case "3":
				await updateTask();
				break;
			case "4":
				searchTask();
				break;
			case "5":
				deleteTask();
				break;
		}

		await pause();
	} while (opt !== "0");
};

main();
