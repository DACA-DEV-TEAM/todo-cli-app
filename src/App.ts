/* eslint-disable no-await-in-loop */
import { inquirerMenu, pausa } from "./user/infrastructure/inquirer/inquirerMenu";

const main = async () => {
	let opt = "";
	do {
		console.clear();

		opt = await inquirerMenu();
		switch (opt) {
			case "1":
				//TODO CREAR TAREA
				break;
			case "2":
				//TODO LISTAR TAREAS
				break;
			case "3":
				//TODO UPDATE TASK
				break;
			case "4":
				//TODO SEARCH TASK
				break;
			case "5":
				//TODO DELETE TASK
				break;
		}

		await pausa();
	} while (opt !== "0");
};

main();
