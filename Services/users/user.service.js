
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

    async getUserSessionById(id) {
        return await this.usersRepository.getUserSessionById(id);
    }

    async saveUser(user, isFromSignup) {
        return await this.usersRepository.saveUser(user, isFromSignup);
    }
    async updateUserProfile(formData, id) {
        return await this.usersRepository.updateUserProfile(formData, id)
    }
    
    async updateUserImage(image, id) {
        return await this.usersRepository.updateUserImage(image, id);
    }
}
export default UserService;