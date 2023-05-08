/* eslint-disable no-console */
import colors from "colors";
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
				name: "0. Log out",
			},
		],
	},
];
const board = colors.white.bold.italic(`
		┌───── •✧✧• ───────┐
		    TODO APP CLI
		└───── •✧✧• ───────┘`);
const inquirerMenu = async (): Promise<string> => {
	console.log(board);
	const { option } = await inquirer.prompt(menu);

	return option;
};
const userMenu = async (): Promise<string> => {
	console.log(board);
	const userSing = [
		{
			type: "list",
			name: "option",
			message: colors.bold.green("Welcome to TODO APP CLI"),
			choices: [
				{
					value: "login",
					name: "Login",
				},
				{
					value: "signup",
					name: "Sing up",
				},
				{
					value: "exit",
					name: "Exit",
				},
			],
		},
	];
	const { option } = await inquirer.prompt(userSing);

	return option;
};

const showDbList = async (): Promise<string> => {
	console.log(board);
	const opción = [
		{
			type: "list",
			name: "option",
			message: colors.bold.green("Choose the database service of your preference:"),
			choices: [
				{
					value: "JSON",
					name: "1. JSON",
				},
				{
					value: "MongoDB",
					name: "2. MongoDB",
				},
				{
					value: "MySQL",
					name: "3. MySQL",
				},
			],
		},
	];

	const { option } = await inquirer.prompt(opción);

	return option;
};
export { inquirerMenu, showDbList, userMenu };
