import { IUser } from "./IUser";

class User implements IUser {
	constructor(public readonly uuid: string, public userName: string, public password: string) {}
}

export default User;
