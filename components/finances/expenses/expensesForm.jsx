"use client";
import { Button } from "@nextui-org/button";
import { ExpensesFormProvider } from "./compound_components/context/expensesFormContext";
import {
    ExpensesFormAmount,
    ExpensesFormCategory,
    ExpensesFormContainer,
    ExpensesFormDate,
    ExpensesFormProject,
    ExpensesFormStatus,
    ExpensesFormUsers,
    ExpensesFromDescription,
} from "./compound_components/expensesFormComponents";
import { useSearchParams } from "next/navigation";

export const ExpensesForm = ({ categories, projects, expense }) => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    return (
        <ExpensesFormProvider categories={categories} projects={projects} expense={expense}>
            <h1 className="text-2xl md:text-4xl font-bold text-slate-200 text-center mb-8">
                {id ? "Editar Gasto" : "Nuevo Gasto"}
            </h1>

            <ExpensesFormContainer
                classNames={{
                    form: "flex flex-col space-y-6 bg-gray-800 bg-opacity-30  w-full max-w-xl mx-auto rounded-lg shadow-lg py-8 px-6",
                }}
            >

                {id ? null : (
                    <>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <ExpensesFormAmount
                                classNames={{
                                    base: "w-full",
                                    input: "w-full",
                                }}
                            />
                            <ExpensesFormDate
                                classNames={{
                                    base: "w-full",
                                    input: "w-full",
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <ExpensesFromDescription
                                classNames={{
                                    base: "w-full",
                                    input: "w-full",
                                }}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <ExpensesFormCategory
                                classNames={{
                                    base: "w-full",
                                    button: "w-full",
                                }}
                            />
                            <ExpensesFormProject
                                classNames={{
                                    base: "w-full",
                                    button: "w-full",
                                }}
                            />
                        </div>
                    </>
                )}


                <div className="flex flex-col sm:flex-row gap-4">
                    {id ? null : (
                        <ExpensesFormUsers
                            classNames={{
                                base: "w-full",
                                button: "w-full",
                            }}
                        />
                    )}
                    <ExpensesFormStatus
                        classNames={{
                            base: "w-full",
                            button: "w-full",
                        }}
                    />
                </div>


                <Button
                    type="submit"
                    className={`w-full sm:w-1/2 mx-auto ${id ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} transition-all text-white`}
                >
                    Guardar
                </Button>
            </ExpensesFormContainer>
        </ExpensesFormProvider>
    );
};
