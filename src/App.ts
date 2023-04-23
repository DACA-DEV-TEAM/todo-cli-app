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
		try {
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
					await searchTask();
					break;
				case "5":
					await deleteTask();
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
	} while (opt !== "0");
};

main();
