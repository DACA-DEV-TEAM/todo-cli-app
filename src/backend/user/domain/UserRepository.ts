import User from "./User";

interface UserRepository {
	create(user: User): Promise<User>;
	update(id: string, updatedUserData: Partial<User>): Promise<boolean>;
	delete(id: string): Promise<boolean>;
	get(id: string): Promise<User>;
	getUserByUsername(username: string): Promise<User>;
}

export default UserRepository;
