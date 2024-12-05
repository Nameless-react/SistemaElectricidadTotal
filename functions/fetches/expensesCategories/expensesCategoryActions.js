"use server";
import { getAllHandler } from "/handles/handleFetch";


export const getExpensesCategories = () => getAllHandler("api/expensesProjecs")