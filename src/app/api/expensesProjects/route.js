import { createExpensesController } from "../../../../controllers/factory";
import { NextResponse } from "next/server";
export async function GET(request) {

    try {
        const controller = createExpensesController();
        return controller.getExpensesProjects(request, NextResponse);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const controller = createExpensesController();

        const result = await controller.saveProjectExpense(request, NextResponse);
        return result;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}

export async function PUT(request) {
    try {
        const controller = createExpensesController();

        const result = await controller.updateProjectExpense(request, NextResponse);
        return result;

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}