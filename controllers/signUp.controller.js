/**
 * Controller for handling user sign-up operations.
 */
class SignUpController {
    /**
     * Constructor for the SignUpController class.
     * @param {UserService} userService - Service for manipulating user-related operations.
     * @param {ValidationUserService} validationUserService - Service for validating user data.
     * @param {ErrorHandler} errorHandler - Service for handling errors. 
    */
    constructor(userService, validationUserService, errorHandler) {
        this.userService = userService;
        this.validationUserService = validationUserService;
        this.errorHandler = errorHandler;
    }

    /**
     * Handles the sign-up process for new users.
     * @param {Object} req - The request object containing user data.
     * @param {Object} res - The response object to send responses.
     * @returns {Promise<Object>} Response message indicating success or failure of the sign-up.
     * @throws Will throw an error if validation fails or an error occurs during user creation.
     */
    async signUp(req, res) {
        const isFromSignup = true;
        try {
            const user = await req.json(); // Parse the request body to get user data
            
            // Validate the user data
            const { error, success, data } = await this.validationUserService.validate(user);
            if (!success) {
                return this.errorHandler.sendError(res, error, "validation_error", 400);
            }

            // Save the new user to the database
            const result = await this.userService.saveUser(data, isFromSignup);

            // Check if the user was saved successfully
            const successSave = result[0][0].p_success;
            if (!successSave) {
                return this.errorHandler.sendError(res, "Error al crear el usuario", "internal_error", 500);
            }

            // Return success message on successful user creation
            return res.json({ message: "Usuario creado exitosamente" }, { status: 201 });
        
        } catch (error) {
            console.error(error);
            // Return error message in case of an exception
            return this.errorHandler.sendError(res, "Error interno del servidor", "internal_server_error", 500);
        }
    }
}

export default SignUpController;
