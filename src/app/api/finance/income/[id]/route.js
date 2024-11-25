import { createIncomeController } from "../../../../../../controllers/factory";
import { NextResponse } from "next/server";
export async function PUT(request, { params }) {

    const controller = createIncomeController();
    const { id } = await params;
    try {
        const result = await controller.inactivateIncome(id, NextResponse);
        return result;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
