import { NextResponse } from "next/server";
import { createToolController } from "../../../../../../controllers/factory";

export async function POST(request) {
    const toolController = createToolController();
    
    try {

        const result = await toolController.saveTool(request, NextResponse);
        return result;

    } catch (error) {
        console.error('Error processing the request:', error);
        return NextResponse.json({ error: "Error processing the request" }, { status: 500 });
    }
}

export async function PUT(request) {

    const toolController = createToolController();
    try {

        const result = await toolController.updateTool(request, NextResponse);
        return result

    } catch (error) {
        console.error('Error processing the request:', error);
        return NextResponse.json({ error: "Error processing the request" }, { status: 500 });
    }
}

export async function DELETE(request) {

    const toolController = createToolController();

    try {
        const result = toolController.deleteTool(request, NextResponse);
        return result;

    } catch (error) {
        console.error('Error processing the request:', error);
        return NextResponse.json({ error: "Error processing the request" }, { status: 500 });
    }
}
