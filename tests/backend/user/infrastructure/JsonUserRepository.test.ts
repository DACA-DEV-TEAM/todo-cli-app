import { UuidService } from "../../../../src/backend/shared/application/UuidService";
import {
	readJsonFile,
	writeJsonFile,
} from "../../../../src/backend/shared/infrastructure/JsonFileUtil";
import User from "../../../../src/backend/user/domain/User";
import JsonUserRepository from "../../../../src/backend/user/infrastructure/JsonUserRepository";

jest.mock("../../../../src/backend/shared/infrastructure/JsonFileUtil");

const mockReadJsonFile = readJsonFile as jest.MockedFunction<typeof readJsonFile>;
const mockWriteJsonFile = writeJsonFile as jest.MockedFunction<typeof writeJsonFile>;

const sampleUser = new User(new UuidService().UUIDgenerator(), "paco", "1234");

describe("JsonUserRepository", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should create a user", async () => {
		mockReadJsonFile.mockResolvedValueOnce([]);
		mockWriteJsonFile.mockResolvedValueOnce(undefined);

		const repository = new JsonUserRepository("testpath");
		const createdUser = await repository.create(sampleUser);

		expect(createdUser).toEqual(sampleUser);
		expect(mockReadJsonFile).toHaveBeenCalledWith("testpath");
		expect(mockWriteJsonFile).toHaveBeenCalledWith("testpath", [sampleUser]);
	});

	it("should get a user by id", async () => {
		mockReadJsonFile.mockResolvedValueOnce([sampleUser]);

		const repository = new JsonUserRepository("testpath");
		const user = await repository.get(sampleUser.uuid);

		expect(user).toEqual(sampleUser);
		expect(mockReadJsonFile).toHaveBeenCalledWith("testpath");
	});

	it("should throw an error if user not found by id", async () => {
		mockReadJsonFile.mockResolvedValueOnce([]);

		const repository = new JsonUserRepository("testpath");

		await expect(repository.get(sampleUser.uuid)).rejects.toThrow("User Not Found");
		expect(mockReadJsonFile).toHaveBeenCalledWith("testpath");
	});

	it("should update a user", async () => {
		mockReadJsonFile.mockResolvedValueOnce([sampleUser]);
		mockWriteJsonFile.mockResolvedValueOnce(undefined);

		const updatedUserData: Partial<User> = { password: "5678" };
		const repository = new JsonUserRepository("testpath");
		const result = await repository.update(sampleUser.uuid, updatedUserData);

		expect(result).toBeTruthy();
		expect(mockReadJsonFile).toHaveBeenCalledWith("testpath");
		expect(mockWriteJsonFile).toHaveBeenCalledWith("testpath", [
			{ ...sampleUser, ...updatedUserData },
		]);
	});

	it("should throw an error if user not found during update", async () => {
		mockReadJsonFile.mockResolvedValueOnce([]);

		const repository = new JsonUserRepository("testpath");
		const updatedUserData: Partial<User> = { password: "5678" };

		await expect(repository.update(sampleUser.uuid, updatedUserData)).rejects.toThrow("Not found");
		expect(mockReadJsonFile).toHaveBeenCalledWith("testpath");
	});

	it("should delete a user", async () => {
		mockReadJsonFile.mockResolvedValueOnce([sampleUser]);
		mockWriteJsonFile.mockResolvedValueOnce(undefined);

		const repository = new JsonUserRepository("testpath");
		const result = await repository.delete(sampleUser.uuid);

		expect(result).toBeTruthy();
		expect(mockReadJsonFile).toHaveBeenCalledWith("testpath");
		expect(mockWriteJsonFile).toHaveBeenCalledWith("testpath", []);
	});

	it("should throw an error if user not found during deletion", async () => {
		mockReadJsonFile.mockResolvedValueOnce([]);

		const repository = new JsonUserRepository("testpath");

		await expect(repository.delete(sampleUser.uuid)).rejects.toThrow("User not found");
		expect(mockReadJsonFile).toHaveBeenCalledWith("testpath");
	});

	it("should get a user by username", async () => {
		mockReadJsonFile.mockResolvedValueOnce([sampleUser]);

		const repository = new JsonUserRepository("testpath");
		const user = await repository.getUserByUsername(sampleUser.userName);

		expect(user).toEqual(sampleUser);
		expect(mockReadJsonFile).toHaveBeenCalledWith("testpath");
	});

	it("should throw an error if user not found by username", async () => {
		mockReadJsonFile.mockResolvedValueOnce([]);

		const repository = new JsonUserRepository("testpath");

		await expect(repository.getUserByUsername(sampleUser.userName)).rejects.toThrow(
			"User Not Found"
		);
		expect(mockReadJsonFile).toHaveBeenCalledWith("testpath");
	});
});
