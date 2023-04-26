import { readFile, writeFile } from "fs/promises";

const reviver = (_key: string, value: string): Date | string => {
	if (
		typeof value === "string" &&
		/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(value)
	) {
		return new Date(value);
	}

	return value;
};

const readJsonFile = async <T>(jsonFilePath: string): Promise<T[]> => {
	const data = await readFile(jsonFilePath, "utf8");
	const dataJson: T[] = JSON.parse(data, reviver);

	return dataJson;
};

const writeJsonFile = async <T>(jsonFilePath: string, dataJson: T[]): Promise<void> => {
	const data = JSON.stringify(dataJson, null, 2);
	await writeFile(jsonFilePath, data);
};

export { readJsonFile, reviver, writeJsonFile };
