/* eslint-disable no-console */
import inquirer from "inquirer";

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
const readInput = async (message: string): Promise<string> => {
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
const getPassword = async (): Promise<string> => {
	const password = [
		{
			type: "password",
			name: "pass",
			message: "password",
			mask: true,
		},
	];
	const { pass } = await inquirer.prompt(password);

	return pass;
};

const getSignUpPassword = async (): Promise<string> => {
	const password = [
		{
			type: "password",
			name: "pass",
			message: "password",
			mask: true,
			validate(value: string) {
				if (value.length < 4) {
					return "The password must be at least 8 characters";
				}

				return true;
			},
		},
		{
			type: "password",
			name: "pass2",
			message: "re-enter password",
			mask: true,
			validate(value: string, answers: { pass: string }) {
				if (value !== answers.pass) {
					return "Passwords do not match";
				}

				return true;
			},
		},
	];
	const { pass } = await inquirer.prompt(password);

	return pass;
};

export { confirmOperation, getPassword, getSignUpPassword, pause, readInput };
