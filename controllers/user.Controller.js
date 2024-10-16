
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
class UserController {

    /**
     * Constructor for the UserController class.
     * @param {UserService} userService - Service for manipulating users.
     * @param {ImageService} imageService - Service for manipulating images.
     */
    constructor(userService, imageService, validationUserProfileService) {
        this.userService = userService;
        this.imageService = imageService;
        this.validationUserProfileService = validationUserProfileService;
    }

    getUserSessionById = async (id) => {

        const user = await this.userService.getUserSessionById(id);
        if (!user) {
            throw new Error("User not found");
        }
        // if (await this.imageService.checkUrlExpiration(user.image)) {
        //     console.log("entra aqui");
        //     const regeneratedUrl = await this.imageService.regenerateSignedURL(user.image);
        //     user.image = regeneratedUrl;
        // }
        return user;
    }

    updateUserProfile = async (req, res) => {
        try {
            const session = await getServerSession(options);
            const id = session.user.id;
            const formData = await req.json();
            const { error, success, data } = await this.validationUserProfileService.validate(formData);
            if (!success) {
                return res.json({ error }, { status: 500 });
            }
            const result = await this.userService.updateUserProfile(data, id);
            return res.json({ message: "User updated successfully" }, { status: 201 });
        } catch (error) {
            console.error(error);
            return res.json({ error: error.message }, { status: 500 });
        }
    }

    updateUserImage = async (req, res) => {
        const session = await getServerSession(options);
        const formData = await req.formData();
        const id = session.user.id;
        const { success, imagePath } = await this.imageService.uploadImageToFirebase(formData, "users");
        if (!success) {
            return res.json({ error: "Error while uploading image" }, { status: 500 });
        }
        const result = await this.userService.updateUserImage(imagePath, id);
        return res.json({ message: "User updated successfully" }, { status: 201 });
    }
}

export default UserController;