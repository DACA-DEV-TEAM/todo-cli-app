import UserRepository from "./UserRepository";

export interface IUserSwitchRepository extends UserRepository {
	switchRepository(db?: string): Promise<UserRepository>;
	getUserRepository(): UserRepository;
}
