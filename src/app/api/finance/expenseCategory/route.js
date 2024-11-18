import { NextResponse } from 'next/server';
import { createExpensesCategoryController } from '../../../../../controllers/factory';
export async function GET(request) {
    try {
        return NextResponse.json({ message: 'GET request to fetch a expense Category' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
export async function POST(request) {
    const controller = createExpensesCategoryController();
    try {
        const result = await controller.saveExpenseCategory(request, NextResponse);
        return result;

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    const controller = createExpensesCategoryController();
    try {
        const result = await controller.updateExpenseCategory(request, NextResponse);
        return result;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}