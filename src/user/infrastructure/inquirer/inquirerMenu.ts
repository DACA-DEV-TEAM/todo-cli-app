import inquirer from "inquirer";

const menu = [
	{
		type: "list",
		name: "option",
		message: "Choose one option",
		choices: [
			{
				value: "1",
				name: "1. Create Task",
			},
			{
				value: "2",
				name: "2. List Tasks",
			},
			{
				value: "3",
				name: "3. Update Task",
			},
			{
				value: "4",
				name: "4. Search Task",
			},
			{
				value: "5",
				name: "5. Delete Task",
			},
			{
				value: "0",
				name: "0. Exit",
			},
		],
	},
];

const inquirerMenu = async (): Promise<string> => {
	/* console.clear();
	console.log("==========================");
	console.log("  Seleccione una opción");
	console.log("==========================\n"); */
	console.log(`
    ┌───── •✧✧• ───────┐
    -   TODO APP CLI    - 
    └───── •✧✧• ───────┘`);
	const { option } = await inquirer.prompt(menu);

	return option;
};

const pause = async (): Promise<void> => {
	const questions = [
		{
			type: "input",
			name: "enter",
			message: `Presione para continuar`,
		},
	];

	console.log("\n");
	await inquirer.prompt(questions);
};

const readImput = async (message: string): Promise<string> => {
	const question = [
		{
			type: "input",
			name: "description",
			message,
			validate(value: string) {
				if (value.length === 0) {
					return "Please, add  a value";
				}

				return true;
			},
		},
	];
	const { description } = await inquirer.prompt(question);

	return description;
};

interface Task {
	id: string;
	description: string;
	status: string;
}

const showTasks = async (tasks: Task[]): Promise<string> => {
	const opción = [
		{
			type: "list",
			name: "option",
			message: "Choose task to update",
			choices: tasks.map((task, i) => {
				const idx = `${i + 1}.`;

				return {
					value: task.id,
					name: `${idx} ${task.description}`,
				};
			}),
		},
	];

	const { option } = await inquirer.prompt(opción);

	return option;
};

const showStatusList = async (): Promise<string> => {
	const opción = [
		{
			type: "list",
			name: "option",
			message: "Choose task status",
			choices: [
				{
					value: "Pending",
					name: "1. Pending",
				},
				{
					value: "On going",
					name: "2. On going",
				},
				{
					value: "Completed",
					name: "3. Completed",
				},
			],
		},
	];

	const { option } = await inquirer.prompt(opción);

	return option;
};

const confirmOperation = async (message: string): Promise<boolean> => {
	const question = [
		{
			type: "confirm",
			name: "ok",
			message,
		},
	];

	const { ok } = await inquirer.prompt(question);

	return ok;
};

export { confirmOperation, inquirerMenu, pause, readImput, showStatusList, showTasks };
