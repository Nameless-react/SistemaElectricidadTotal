"use client"

import { Button } from "@nextui-org/button"
import { BudgetFormAmount, BudgetFormContainer, BudgetFormDate, BudgetFormDescription, BudgetFormProject, BudgetFormStatus, BudgetFormUsers } from "./compound_components/budgetFormComponents"
import { BudgetFormProvider } from "./compound_components/contexts/bugdetFormContext"

export const BudgetForm = ({ projects, projectBudget }) => {
    return (
        <BudgetFormProvider projects={projects} projectBudget={projectBudget}>

            <h1 className="text-2xl md:text-4xl font-bold text-slate-200 text-center mb-8">
                Agregar Presupuesto
            </h1>
            <BudgetFormContainer
                classNames={{
                    form: "flex flex-col space-y-6 bg-gray-800 bg-opacity-30  w-full max-w-xl mx-auto rounded-lg shadow-lg py-8 px-6",
                }}
            >
                <div className="flex flex-col sm:flex-row gap-4">
                    <BudgetFormAmount classNames={
                        {
                            base: "w-full",
                            input: "w-full",
                        }
                    } />
                    <BudgetFormDate classNames={{
                        base: "w-full",
                        input: "w-full",
                    }} />
                </div>
                <div className="flex flex-col gap-4">
                    <BudgetFormDescription
                        classNames={
                            {
                                base: "w-full",
                                input: "w-full",
                            }
                        }
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <BudgetFormStatus
                        classNames={{
                            base: "w-full",
                            button: "w-full",
                        }}
                    />
                    <BudgetFormProject
                        classNames={{
                            base: "w-full",
                            button: "w-full",
                        }}
                    />
                </div>
    
                <Button
                    type="submit"
                    className="w-full sm:w-1/2 mx-auto bg-green-600 hover:bg-green-700 transition-all text-white"
                >
                    Guardar
                </Button>
            </BudgetFormContainer>
        </BudgetFormProvider>

    )
}