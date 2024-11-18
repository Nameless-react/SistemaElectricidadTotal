import { NextResponse } from "next/server";
import { createIncomeCategoryController } from "../../../../../../controllers/factory";

export async function PUT(request, { params }) {

    const controller = createIncomeCategoryController();
    const { id } = params;
    try {
        const result = await controller.inactivateIncomeCategory(id, NextResponse);
        return result;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
