import User from "../../../../src/backend/user/domain/User";

describe("User", () => {
	const uuid = "test-uuid";
	const userName = "test-user-name";
	const password = "test-password";
	const user = new User(uuid, userName, password);

	it("should have the correct properties", () => {
		expect(user.uuid).toBe(uuid);
		expect(user.userName).toBe(userName);
		expect(user.password).toBe(password);
	});
});
