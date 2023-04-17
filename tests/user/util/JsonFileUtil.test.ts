import fs from "fs/promises";
import { readJsonFile, writeJsonFile } from "../../../src/user/util/JsonFileUtil";

/*
jest.mock("fs/promises");
describe("readJsonFile", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an empty array if the file does not exist", async () => {
    fs.readFile.mockRejectedValueOnce({ code: "ENOENT" });

    const result = await readJsonFile("nonexistent.json");
    expect(result).toEqual([]);
  });

  it("should return a valid array of tasks if the file contains valid JSON", async () => {
    const tasks = [
      { id: 1, title: "Task 1" },
      { id: 2, title: "Task 2" },
    ];
    fs.readFile.mockResolvedValueOnce(JSON.stringify(tasks));

    const result = await readJsonFile("valid.json");
    expect(result).toEqual(tasks);
  });

  it("should throw an error if the file contains invalid JSON", async () => {
    fs.readFile.mockResolvedValueOnce("{invalid-json");

    await expect(readJsonFile("invalid.json")).rejects.toThrow(SyntaxError);
  });
});

describe("writeJsonFile", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should write an empty array to the file if provided an empty task list", async () => {
    await writeJsonFile("empty.json", []);

    expect(fs.writeFile).toHaveBeenCalledWith("empty.json", "[]");
  });

  it("should write a non-empty array to the file if provided a non-empty task list", async () => {
    const tasks = [
      { id: 1, title: "Task 1" },
      { id: 2, title: "Task 2" },
    ];

    await writeJsonFile("nonempty.json", tasks);

    expect(fs.writeFile).toHaveBeenCalledWith(
      "nonempty.json",
      JSON.stringify(tasks, null, 2)
    );
  });
});
*/
