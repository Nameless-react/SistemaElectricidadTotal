import { NextResponse } from "next/server";
import { createMaterialController } from "../../../../../../../controllers/factory";


export async function GET(request) {

   return NextResponse.json({message: 'Hello from Next.js!'}, { status: 200 });
}

export async function DELETE(request) {

    //const toolController = createToolController();
    try {

        const materialController = createMaterialController();
        const result = materialController.deleteMaterial(request, NextResponse);
        return result;

    } catch (error) {
        console.error('Error processing the request:', error);
        return NextResponse.json({ error: "Error processing the request" }, { status: 500 });
    }
}