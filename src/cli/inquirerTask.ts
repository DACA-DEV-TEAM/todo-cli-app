import inquirer from "inquirer";

const showTasks = async (
	tasks: { id: string; description: string; status: string }[]
): Promise<string> => {
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
export { showStatusList, showTasks };
