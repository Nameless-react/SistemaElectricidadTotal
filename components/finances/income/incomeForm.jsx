"use client";

import { useSearchParams } from "next/navigation";
import { IncomeFormProvider } from "./Compound_Components/contexts/incomeFormContext";
import { IncomeCategoryFormContainer } from "../incomeCategory/compound_components/incomeCategoryFormComponents";
import { IncomeFormAmount, IncomeFormCategoryDropdown, IncomeFormContainer, IncomeFormDescription, IncomeFormPaymentMethodDropdown, IncomeFormProjectDropdown, IncomeFormStatusDropdown } from "./Compound_Components/incomeFormComponents";
import { Button } from "@nextui-org/button";

export const IncomeForm = ({ projects, incomeCategories, income }) => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    return (
        <IncomeFormProvider
            projects={projects}
            incomeCategories={incomeCategories}
            income={income}
        >
            <h1 className="text-2xl md:text-4xl font-bold text-slate-200 text-center mb-8">
                {id ? "Editar Ingreso" : "Nuevo Ingreso"}
            </h1>
            <IncomeFormContainer
                classNames={{
                    form: "flex flex-col space-y-6 bg-gray-800 bg-opacity-30  w-full max-w-xl mx-auto rounded-lg shadow-lg py-8 px-6",
                }}
            >
                <div className="flex flex-col sm:flex-row gap-4">
                    <IncomeFormAmount
                        classNames={{
                            base: "w-full",
                            input: "w-full",
                        }}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <IncomeFormDescription
                        classNames={{
                            base: "w-full",
                            input: "w-full"
                        }}
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 ">
                    <IncomeFormProjectDropdown
                        classNames={{
                            base: "w-full",
                            button: "w-full",
                        }}
                    />
                    <IncomeFormCategoryDropdown

                        classNames={{
                            base: "w-full",
                            button: "w-full",
                        }}
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 ">
                    <IncomeFormStatusDropdown classNames={{
                        base: "w-full",
                        button: "w-full",
                    }} />
                    <IncomeFormPaymentMethodDropdown classNames={{
                        base: "w-full",
                        button: "w-full",
                    }} />
                </div>
                <Button
                    type="submit"
                    className={`w-full sm:w-1/2 mx-auto ${id ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} transition-all text-white`}
                >
                    Guardar
                </Button>
            </IncomeFormContainer>
        </IncomeFormProvider>
    )
}
