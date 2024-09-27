import { NextResponse } from "next/server";
import { createToolController } from "../../../../../../../controllers/factory";
export async function DELETE(request) {

    //const toolController = createToolController();
    try {
        console.log(request);
        return NextResponse.json({ message: "Tool deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error('Error processing the request:', error);
        return NextResponse.json({ error: "Error processing the request" }, { status: 500 });
    }
}