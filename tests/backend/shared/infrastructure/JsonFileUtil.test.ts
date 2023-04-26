import { readFile, writeFile } from "fs/promises";

import { Task } from "../../../../src/backend/task/domain/Task";
import { readJsonFile, reviver, writeJsonFile } from "../../../../src/shared/infrastructure/JsonFileUtil";

jest.mock("fs/promises");

const mockReadFile = readFile as jest.MockedFunction<typeof readFile>;

afterEach(() => {
	jest.clearAllMocks();
});

describe("reviver", () => {
	it("should return a Date object when the input is an ISO date string", () => {
		const dateString = "2022-01-01T00:00:00.000Z";
		const result = reviver("anyKey", dateString);

		if (result instanceof Date) {
			expect(result.toISOString()).toBe(dateString);
		} else {
			throw new Error("Expected result to be a Date");
		}
		expect(result.toISOString()).toBe(dateString);
	});
	it("should return the input value when the input is not an ISO date string", () => {
		const nonDateString = "Not a date string";
		const result = reviver("anyKey", nonDateString);

		expect(result).toBe(nonDateString);
	});
});

const jsonFilePath = "test.json";
const task = new Task("This is a test");
const tasks: Task[] = [task];

describe("readJsonFile", () => {
	it("should return an array of tasks when the file exists", async () => {
		mockReadFile.mockResolvedValueOnce(JSON.stringify(tasks));

		const result = await readJsonFile(jsonFilePath);

		expect(result).toEqual(tasks);
	});

	it("should throw an error if the file content is not valid JSON", async () => {
		mockReadFile.mockResolvedValueOnce("Invalid JSON content");

		await expect(readJsonFile(jsonFilePath)).rejects.toThrow(SyntaxError);
		expect(mockReadFile).toHaveBeenCalledWith(jsonFilePath, "utf8");
	});

	it("should throw an error when the file does not exist", async () => {
		const error = new Error("File not found") as Error & { code: string };
		error.code = "ENOENT";
		mockReadFile.mockRejectedValueOnce(error);

		await expect(readJsonFile(jsonFilePath)).rejects.toThrow("File not found");
		expect(mockReadFile).toHaveBeenCalledWith(jsonFilePath, "utf8");
	});
});

describe("writeJsonFile", () => {
	it("should write an empty array to the file if provided an empty task list", async () => {
		await writeJsonFile("empty.json", []);

		expect(writeFile).toHaveBeenCalledWith("empty.json", "[]");
	});

	it("should write a non-empty array to the file if provided a non-empty task list", async () => {
		await writeJsonFile("nonempty.json", tasks);

		expect(writeFile).toHaveBeenCalledWith("nonempty.json", JSON.stringify(tasks, null, 2));
	});
});
