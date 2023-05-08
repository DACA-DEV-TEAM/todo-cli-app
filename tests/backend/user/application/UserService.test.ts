/* eslint-disable @typescript-eslint/unbound-method */
import { UuidService } from "../../../../src/backend/shared/application/UuidService";
import { BcryptService } from "../../../../src/backend/user/application/BcryptService";
import { UserService } from "../../../../src/backend/user/application/UserService";
import { IUserSwitchRepository } from "../../../../src/backend/user/domain/IUserSwitchRepository";
import User from "../../../../src/backend/user/domain/User";

const mockedUserSwitchRepository: jest.Mocked<IUserSwitchRepository> = {
	create: jest.fn(),
	update: jest.fn(),
	delete: jest.fn(),
	get: jest.fn(),
	getUserByUsername: jest.fn(),
	getUserRepository: jest.fn(),
	switchRepository: jest.fn(),
};

jest.mock("../../../../src/backend/user/application/BcryptService");
jest.mock("../../../../src/backend/shared/application/UuidService");

const username = "testuser";
const password = "testpassword";
const uuid = "test-uuid";
const hashedPassword = "hashed-password";

const setup = () => {
	const userRepository = mockedUserSwitchRepository;
	const bcryptService = new BcryptService() as jest.Mocked<BcryptService>;
	const uuidService = new UuidService() as jest.Mocked<UuidService>;
	const userService = new UserService(bcryptService, uuidService, userRepository);

	return { userRepository, bcryptService, uuidService, userService };
};

describe("UserService", () => {
	describe("createUser", () => {
		it("should create a new user with a hashed password", async () => {
			const { userRepository, bcryptService, uuidService, userService } = setup();

			uuidService.UUIDgenerator.mockReturnValue(uuid);
			bcryptService.encrypt.mockResolvedValue(hashedPassword);
			userRepository.create.mockResolvedValue(new User(uuid, username, hashedPassword));

			const newUser = await userService.createUser(username, password);

			expect(newUser).toEqual(new User(uuid, username, hashedPassword));
			expect(bcryptService.encrypt).toHaveBeenCalledWith(password);
			expect(userRepository.create).toHaveBeenCalledWith(new User(uuid, username, hashedPassword));
		});
	});

	describe("authenticate", () => {
		const setupAuthenticate = () => {
			const { userRepository, bcryptService, userService } = setup();
			userRepository.getUserByUsername.mockResolvedValue(new User(uuid, username, hashedPassword));
			bcryptService.decrypt.mockResolvedValue(true);

			return { userRepository, bcryptService, userService };
		};

		it("should return the user UUID if the authentication is successful", async () => {
			const { bcryptService, userService } = setupAuthenticate();

			const result = await userService.authenticate(username, password);

			expect(result).toEqual(uuid);
			expect(bcryptService.decrypt).toHaveBeenCalledWith(password, hashedPassword);
		});

		it("should return an empty string if the password is incorrect", async () => {
			const { bcryptService, userService } = setupAuthenticate();
			bcryptService.decrypt.mockResolvedValue(false);

			const result = await userService.authenticate(username, password);

			expect(result).toEqual("");
			expect(bcryptService.decrypt).toHaveBeenCalledWith(password, hashedPassword);
		});

		it("should return an empty string if an error occurs", async () => {
			const { userRepository, userService } = setupAuthenticate();
			userRepository.getUserByUsername.mockRejectedValue(new Error("Test error"));

			const result = await userService.authenticate(username, password);

			expect(result).toEqual("");
		});
	});
});
