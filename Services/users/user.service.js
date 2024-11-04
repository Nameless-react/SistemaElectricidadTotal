
class UserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    /**
     * Retrieves all users from the database.
     * @returns {Array|null} A promise that resolves with an array of users or null if none are found.
     * @throws {Error} If an error occurs while connecting to the database or executing the query.
     */
    async getAllUsers() {
        return await this.usersRepository.getAllUsers();
    }

    /**
     * Retrieves a user from the database by their id.
     * @param {number} id - The id of the user to be retrieved.
     * @returns {Promise<Object>} - The user object if found, otherwise null.
     * @throws {Error} - If an error occurs while connecting to the database or executing the query.
     */
    async getUserById(id) {
        return await this.usersRepository.getUserById(id);
    }

    /**
     * Retrieves a user session by its id from the database.
     * @param {number} id - The id of the user session to retrieve.
     * @returns {Promise<Object>} - The user session object with the given id, or null if not found.
     * @throws {Error} - If an error occurs while connecting to the database or executing the query.
     */
    async getUserSessionById(id) {
        return await this.usersRepository.getUserSessionById(id);
    }

/**
 * Saves a user to the database.
 * @param {Object} user - An object containing the user's data.
 * @param {boolean} isFromSignup - A boolean indicating whether the user is being saved from the signup form.
 * @returns {Promise<Object>} - The user object if saved successfully, otherwise null.
 * @throws {Error} - If an error occurs while saving the user.
 */
    async saveUser(user, isFromSignup) {
        return await this.usersRepository.saveUser(user, isFromSignup);
    }
    /**
     * Updates the user's profile.
     * @param {Object} formData - The data to update the user's profile.
     * @param {number} id - The ID of the user.
     * @returns {Promise<Object>} - The updated user.
     * @throws {Error} - If an error occurs while updating the user.
     */
    async updateUserProfile(formData, id) {
        return await this.usersRepository.updateUserProfile(formData, id)
    }
    
/**
 * Updates the user's profile image.
 * @param {string} image - The URL of the new image.
 * @param {number} id - The ID of the user.
 * @returns {Promise<Object>} - The updated user.
 * @throws {Error} - If an error occurs while updating the user.
 */
    async updateUserImage(image, id) {
        return await this.usersRepository.updateUserImage(image, id);
    }
}
export default UserService;