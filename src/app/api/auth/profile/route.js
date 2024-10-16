import { NextResponse } from "next/server";
import { createUserController } from "../../../../../controllers/factory";
export async function GET(request) {
    return NextResponse.json({ message: 'Hello from Next.js!' }, { status: 200 });
}

export async function PUT(request) {
    const userController = createUserController();
    const result = await userController.updateUserProfile(request, NextResponse);
    return result
}