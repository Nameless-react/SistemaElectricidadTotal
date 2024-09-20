import { NextRequest, NextResponse } from "next/server";
import CategoryController from "../../../../controllers/category.controller";

const categoryController = new CategoryController();
export async function GET(req) {
    try {
        const categories = await categoryController.getCategories();
        if (!categories) {
            return NextResponse.json({ message: 'Categories not found' }, { status: 404 });
        }
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error('Error while getting categories:', error);
        return NextResponse.json({ message: 'Error while getting categories' }, { status: 500 });
    }
}
