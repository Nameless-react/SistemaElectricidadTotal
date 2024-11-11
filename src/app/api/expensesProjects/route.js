import { createExpensesProjectsController } from "../../../../controllers/factory";
import { NextResponse } from "next/server";
export async function GET(request) {

    const controller = createExpensesProjectsController();

    return controller.getExpensesProjects(request, NextResponse);
    
}