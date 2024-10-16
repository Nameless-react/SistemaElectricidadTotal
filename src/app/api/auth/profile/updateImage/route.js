import { NextResponse } from "next/server"
import { createUserController } from "../../../../../../controllers/factory";

/**
 * Updates the user's profile image.
 *
 * @param {Request} req - The request object
 * @param {NextResponse} res - The response object
 * @returns {Promise<NextResponse>} The response with the updated user's data
 */
export const POST = async (req) => {
    
    const userController = createUserController();
    const result = await userController.updateUserImage(req, NextResponse);
    return result;
}