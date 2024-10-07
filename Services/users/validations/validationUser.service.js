class ValidationUserService {
    constructor(userValidation) {
        this.userValidation = userValidation;
    }

    async validate(user) {
        return await this.userValidation(user);
    }
}
export default ValidationUserService;