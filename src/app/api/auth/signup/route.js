import { NextResponse } from "next/server";
import { createSignUpController } from "../../../../../controllers/factory";

export const POST = async (req) => {
    const signUpController = createSignUpController();
    const result = await signUpController.signUp(req, NextResponse);
    return result;
}