import { NextResponse } from 'next/server';
import ToolsController from "../../../../../controllers/tools.controller";
import ToolsRepository from '../../../../../repositories/tools.Repository';
const toolsRepository = new ToolsRepository();
const toolsController = new ToolsController(toolsRepository);

export async function GET(req) {
    try {
        const tools = await toolsController.getTools();

        if (!tools) {
            return NextResponse.json({ message: 'Tools not found' }, { status: 404 });
        }

        return NextResponse.json(tools, { status: 200 });

    } catch (error) {
        console.error('Error while getting tools:', error);
        return NextResponse.json({ message: 'Error while getting tools' }, { status: 500 });
    }
}