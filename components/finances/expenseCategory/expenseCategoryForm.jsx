"use client";

import { Button } from "@nextui-org/button";
import { ExpensesCategoryFormProvider } from "./compoun_components/contexts/expenseCategoryFormContext";
import { ExpenseCategoryFormContainer, ExpenseCategoryFormDescription, ExpenseCategoryFormName, ExpenseCategoryFormStatus } from "./compoun_components/expenseCategoryFormComponents";


export const ExpensesCategoryForm = ({expenseCategory, id}) => {
    return (
        <ExpensesCategoryFormProvider expenseCategory={expenseCategory}>
            <h1 className="text-2xl md:text-4xl font-bold text-slate-200 text-center mb-8">
               {id ? "Editar" : "Crear"} Categoría de Gasto
            </h1>
            <ExpenseCategoryFormContainer
                classNames={{
                    form: "flex flex-col space-y-6 bg-gray-800 bg-opacity-30  w-full max-w-xl mx-auto rounded-lg shadow-lg py-8 px-6",
                }}
            >
                <div className="flex flex-col sm:flex-row gap-4">
                    <ExpenseCategoryFormName
                        classNames={{
                            base: "w-full",
                            input: "w-full",
                        }}
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <ExpenseCategoryFormDescription
                        classNames={{
                            base: "w-full",
                            input: "w-full",
                        }}
                    />
                </div>
                <div>
                    <ExpenseCategoryFormStatus
                        classNames={{
                            base: "w-full",
                            button: "dark w-full ",
                        }}
                    />
                </div>
                <Button
                    type="submit"
                    className={`w-full sm:w-1/2 mx-auto ${id ? 'bg-blue-600 hover:bg-blue-700': 'bg-green-600 hover:bg-green-700'} transition-all text-white`}
                >
                    Guardar
                </Button>
            </ExpenseCategoryFormContainer>
        </ExpensesCategoryFormProvider>
    );
};
