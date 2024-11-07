import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

class UserController {

    /**
     * Constructor for the UserController class.
     * @param {UserService} userService - Service for managing user operations.
     * @param {ImageService} imageService - Service for handling image operations.
     * @param {ValidationUserProfileService} validationUserProfileService - Service for validating user profile data.
     * @param {ErrorHandler} errorHandler - Service for handling errors.
    */
    constructor(userService, imageService, validationUserProfileService, errorHandler) {
        this.userService = userService;
        this.imageService = imageService;
        this.validationUserProfileService = validationUserProfileService;
        this.errorHandler = errorHandler;
    }

    /**
     * Retrieves a user session by ID.
     * @param {number} id - The ID of the user to retrieve.
     * @returns {Promise<Object>} - The user's session data.
     * @throws {Error} - Throws error if user is not found.
     */
    getUserSessionById = async (id) => {
        const user = await this.userService.getUserSessionById(id);
        if (!user) {
            throw new Error("User not found");
        }

        // Example: Regenerate image URL if expired (commented out)
        // if (await this.imageService.checkUrlExpiration(user.image)) {
        //     const regeneratedUrl = await this.imageService.regenerateSignedURL(user.image);
        //     user.image = regeneratedUrl;
        // }

        return user;
    }

    /**
     * Updates the user's profile information.
     * @param {Request} req - The request object containing the user's profile data.
     * @param {Response} res - The response object to return feedback.
     * @returns {Promise<Response>} - A success or error message in JSON format.
     */
    updateUserProfile = async (req, res) => {
        try { 
 
            const session = await getServerSession(options);
            const id = session.user.id;
            const formData = await req.json();

            // Validate the profile data
            const { error, success, data } = await this.validationUserProfileService.validate(formData);
            if (!success) {
                return this.errorHandler.sendError(res, error, "validation_error", 500);
            } 

            // Update the user profile
            await this.userService.updateUserProfile(data, id);
            return res.json({ message: "Perfil actualizado con éxito" }, { status: 201 });

        } catch (error) {
            console.error(error);
            return this.errorHandler.sendError(res, "Error interno del servidor", "internal_server_error", 500);
        }
    }

    /**
     * Updates the user's profile image.
     * @param {Request} req - The request object containing the image data.
     * @param {Response} res - The response object to return feedback.
     * @returns {Promise<Response>} - A success or error message in JSON format.
     */
    updateUserImage = async (req, res) => {
        try {
        
            const session = await getServerSession(options);
            const formData = await req.formData();
            const id = session.user.id;

            // Upload the image to Firebase
            const { success, imagePath } = await this.imageService.uploadImageToFirebase(formData, "users");
            if (!success) {
                 return this.errorHandler.sendError(res, "Error al subir la imagen", "image_upload_error", 500);
            }

            // Update the user's image in the database
            await this.userService.updateUserImage(imagePath, id);
            return res.json({ message: "Imagen de perfil actualizada con éxito" }, { status: 201 });

        } catch (error) {
            console.error(error);
            return this.errorHandler.sendError(res, "Error interno del servidor", "internal_server_error", 500);
        }
    }
}

export default UserController;
