
class SignUpController {
    constructor(userService, validationUserService) {
        this.userService = userService;
        this.validationUserService = validationUserService;
    }

    async signUp(req, res) {
        const isFromSignup = true;
        try {
            const user = await req.json();
            
            const { error, success, data } = await this.validationUserService.validate(user);
            if (!success) {
                return res.json({ error });
            }
            const result = await this.userService.saveUser(data, isFromSignup);

            const successSave = result[0][0].p_success;
            if (!successSave) {
                return res.json({ error: "Error while creating user" }, { status: 500 });
            }

            return res.json({ message: "User created successfully" }, { status: 201 });
        
        } catch (error) {
            console.error(error);
            return res.json({ error: error.message });
        }
    }
}

export default SignUpController;