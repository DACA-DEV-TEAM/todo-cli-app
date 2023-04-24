import User from "../entities/User";

interface UserStorage {
	create(user: User): Promise<User>;
	update(id: string, updatedUserData: Partial<User>): Promise<boolean>;
	delete(id: string): Promise<boolean>;
	get(id: string): Promise<User>;
}

export default UserStorage;
