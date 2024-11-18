import { NextResponse } from "next/server";
import { createIncomeCategoryController } from "../../../../../controllers/factory";

export async function POST(request) {
    const controller = createIncomeCategoryController();
    try {
        const result = await controller.saveIncomeCategory(request, NextResponse);
        return result;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function PUT(request) {
    const controller = createIncomeCategoryController();
    try {
        const result = await controller.updateIncomeCategory(request, NextResponse);
        return result;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}