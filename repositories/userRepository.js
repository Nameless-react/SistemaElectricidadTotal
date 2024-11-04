import bcrypt from 'bcrypt';

class UserRepository {
    
    /**
     * Constructor for the UserRepository class.
     * @param {Model} User - The User model.
     * @param {Sequelize} sequelize - The Sequelize instance.
     */
    constructor(User, sequelize) {
        this.User = User;
        this.sequelize = sequelize;
    }


    /**
     * Retrieves all users from the database.
     * @returns {Array|null} A promise that resolves with an array of users or null if none are found.
     * @throws {Error} If an error occurs while connecting to the database or executing the query.
     */
    async getAllUsers() {
        try {
            const users = await this.User.findAll();
            return users? users : null;
        } catch (error) {
            throw new Error(error, "Error while getting users");
        }
    }

   
    /**
     * Retrieves a user from the database by their id.
     * @param {number} id - The id of the user to be retrieved.
     * @returns {Promise<Object>} - The user object if found, otherwise null.
     * @throws {Error} - If an error occurs while connecting to the database or executing the query.
     */
    async getUserById(id) {
        try {
            const user = await this.User.findOne({ where: { id_users: id } });
           
            return user? user : null;

        } catch (error) {
            throw new Error(error, "Error while getting user");
        }
    }

  
    /**
     * Retrieves a user session by its id from the database.
     * @param {number} id - The id of the user session to retrieve.
     * @returns {Promise<Object>} - The user session object with the given id, or null if not found.
     * @throws {Error} - If an error occurs while connecting to the database or executing the query.
     */
    async getUserSessionById(id) {
        try {
            const user = await this.sequelize.query(
                `SELECT * FROM user_in_session_view WHERE id = :p_id`,
                {
                    replacements: { p_id: id },
                    type: this.sequelize.QueryTypes.SELECT,
                }
            );
            return user? user[0] : null;
        } catch (error) {
            console.error(error);
            throw new Error(error, "Error while getting user");
        }
    }

    
    /**
     * Saves a user to the database.
     * @param {Object} user - An object containing the user's data.
     * @param {boolean} isFromSignup - A boolean indicating whether the user is being saved from the signup form.
     * @returns {Promise<Object>} - The user object if saved successfully, otherwise null.
     * @throws {Error} - If an error occurs while saving the user.
     */
    async saveUser(user, isFromSignup) {
        let defaultRole = "Usuario";
        let isVerified = false;
        let isDeleted = false;
        let createdAt = new Date();
        let updatedAt = new Date();
        const hashedPassword = await bcrypt.hash(user.password, 10);
        try {
            if (isFromSignup) {
                const newUser = await this.sequelize.query(
                    `CALL save_user
                    (
                    :p_name,
                    :p_image,
                    :p_first_sur_name, 
                    :p_second_sur_name, 
                    :p_email,
                    :p_identification,
                    :p_phone, 
                    :p_password, 
                    :p_created_at,
                    :p_updated_at,
                    :p_verify,
                    :p_deleted,
                    :p_role,
                    :p_role_id,
                    :p_user_id,
                    :p_success
                    )`, {
                    replacements: {
                        p_name: user.name,
                        p_image: null,
                        p_first_sur_name: user.firstSurName,
                        p_second_sur_name: user.secondSurName,
                        p_email: user.email,
                        p_identification: user.identification,
                        p_phone: user.number,
                        p_password: hashedPassword,
                        p_created_at: createdAt.toISOString(),
                        p_updated_at: updatedAt.toISOString(),
                        p_verify: isVerified,
                        p_deleted: isDeleted,
                        p_role: defaultRole,
                        p_role_id: null,
                        p_user_id: null,
                        p_success: null
                    },
                    type: this.sequelize.QueryTypes.RAW
                });
                return newUser? newUser : null;
            } 
        } catch (error) {
            console.error(error);
            throw new Error("Error while saving user: " + error.message);
        }
    }

    
    /**
     * Updates the user's profile image.
     * @param {string} image - The URL of the new image.
     * @param {number} id - The ID of the user.
     * @returns {Promise<Object>} - The updated user.
     * @throws {Error} - If an error occurs while updating the user.
     */
    async updateUserImage(image, id) {
        try {
            const result = await this.User.update({ image: image }, { where: { id_users: id } });

            return result? result : null;

        } catch (error) {
            throw new Error('Error while saving user: ' + error.message)
        }
    }

  
    /**
     * Updates the user's profile.
     * @param {Object} formData - The data to update the user's profile.
     * @param {number} id - The ID of the user.
     * @returns {Promise<Object>} - The updated user.
     * @throws {Error} - If an error occurs while updating the user.
     */
    async updateUserProfile(formData, id) {
        const { name, firstsurname, secondsurname, phone, address } = formData;
        try {
            const result = await this.User.update({
                name: name,
                first_sur_name: firstsurname,
                second_sur_name: secondsurname,
                phone: phone,
                address: address
            }, { where: { id_users: id } });

            return result? result : null;

        } catch (error) {
            throw new Error('Error while updating user profile: ' + error.message);

        }
    }
}

export default UserRepository;