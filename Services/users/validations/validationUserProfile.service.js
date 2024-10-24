class ValidationUserProfileService {

/**
 * Constructs an instance of ValidationUserProfileService.
 *
 * @param {Function} profileValidation - A function used to validate user profiles.
 */
    constructor(profileValidation) {
        this.profileValidation = profileValidation;
    }

/**
 * Asynchronously validates a user using the profileValidation function.
 * 
 * @param {Object} user - The user object to be validated.
 * @returns {Promise} - A promise that resolves with the result of the validation.
 */
    async validate(user) {
        return await this.profileValidation(user);
    }
}

export default ValidationUserProfileService;