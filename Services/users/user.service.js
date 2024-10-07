
class UserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    async getAllUsers() {
        return await this.usersRepository.getAllUsers();
    }

    async getUserById(id) {
        return await this.usersRepository.getUserById(id);
    }

    async saveUser(user, isFromSignup) {
        return await this.usersRepository.saveUser(user, isFromSignup);
    }
}

export default UserService;