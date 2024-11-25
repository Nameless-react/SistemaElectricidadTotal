import { NextResponse } from "next/server";
import { createIncomeController } from "../../../../../controllers/factory";
export async function POST(request) {
    const incomeController = createIncomeController();
    try {
        const result = await incomeController.saveIncome(request, NextResponse);
        return result;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    const incomeController = createIncomeController();
    try {
        const result = await incomeController.updateIncome(request, NextResponse);
        return result;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
