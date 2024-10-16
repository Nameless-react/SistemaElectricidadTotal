import bcrypt from 'bcrypt';

class UserRepository {
    constructor(User, sequelize) {
        this.User = User;
        this.sequelize = sequelize;
    }

    async getAllUsers() {
        try {
            const users = await this.User.findAll();
            if (!users) {
                throw new Error("No users found");
            }
            return users;
        } catch (error) {
            throw new Error(error, "Error while getting users");
        }
    }

    async getUserById(id) {
        try {
            const user = await this.User.findOne({ where: { id_users: id } });
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            throw new Error(error, "Error while getting user");
        }
    }


    /**
     * Saves a user to the database. If isFromSignup is true, it will call the stored procedure to save the user.
     * If isFromSignup is false, it will throw an error.
     * @param {Object} user - The user data to be saved.
     * @param {boolean} isFromSignup - Indicates if the user is being saved from the signup form.
     * @returns {Promise<Object>} - The newly saved user.
     * @throws {Error} - If there is an error while saving the user.
     */
    async saveUser(user, isFromSignup) {
        let defaultRole = "Usuario";
        let isVerified = false;
        let isDeleted = false;
        let createdAt = new Date();
        let updatedAt = new Date();
        const hashedPassword = await bcrypt.hash(user.password,10);
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
                return newUser;
            } else {

            }
        } catch (error) {
            console.error(error);
            throw new Error("Error while saving user: " + error.message);
        }
    }


}

export default UserRepository;