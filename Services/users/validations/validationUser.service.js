class ValidationUserService {
    /**
     * Constructor for the ValidationUserService class.
     * @param {function} userValidation - Function for validating users.
     */
    constructor(userValidation) {
        this.userValidation = userValidation;
    }

    /**
     * Validates a user using the userValidation function.
     * 
     * @param {Object} user - The user object to be validated.
     * @returns {Promise} - A promise that resolves with the result of the validation.
     */
    async validate(user) {
        return await this.userValidation(user);
    }
}
export default ValidationUserService;