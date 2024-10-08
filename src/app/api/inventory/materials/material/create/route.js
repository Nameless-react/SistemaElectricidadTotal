import { NextResponse } from "next/server"
import { createMaterialController } from "../../../../../../../controllers/factory";


export async function POST(request) {

    const materialController = createMaterialController();
    try {
        const result = await materialController.saveMaterial(request, NextResponse);
        return result;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
