import { createBudgetController } from '../../../../../controllers/factory';
import { NextResponse } from 'next/server';
export async function GET(request) {
    try {
        return NextResponse.json({ message: 'GET request to fetch a expense Category' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function POST(request) {
    const budgetController = createBudgetController();
    try {
        const result = await budgetController.saveProjectBudget(request, NextResponse);
        return result;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function PUT(request) {
    const budgetController = createBudgetController();
    try {
        const result = await budgetController.updateProjectBudget(request, NextResponse);
        return result;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}