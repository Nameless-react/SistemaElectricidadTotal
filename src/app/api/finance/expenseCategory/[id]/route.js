import { NextResponse } from "next/server";
import { createExpensesCategoryController } from "../../../../../../controllers/factory";

export async function GET(request, { params }) {
    console.log("Entra al controlador de GET");
    const controller = createExpensesCategoryController();
    const { id } = params; // Accediendo al parámetro `id`

    try {
        const result = await controller.getExpenseCategoryById(id, NextResponse);
        return result;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}

export async function PUT(request, { params }) {
    console.log("Entra al controlador de PUT");
    const controller = createExpensesCategoryController();
    const { id } = params;
    try {
        const result = await controller.inactivateExpenseCategory(id, NextResponse);
        return result;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
