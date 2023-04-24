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
const board = `
┌───── •✧✧• ───────┐
-   TODO APP CLI    - 
└───── •✧✧• ───────┘`;
const inquirerMenu = async (): Promise<string> => {
	console.log(board);
	const { option } = await inquirer.prompt(menu);

	return option;
};

export { inquirerMenu };
