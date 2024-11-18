"use client";

import { Button } from "@nextui-org/button";
import { useSearchParams } from "next/navigation";
import { IncomeCategoryFormProvider } from "./compound_components/contexts/incomeCategoryFormContext";
import { IncomeCategoryFormContainer, IncomeCategoryFormDescription, IncomeCategoryFormName, IncomeCategoryFormStatus } from "./compound_components/incomeCategoryFormComponents";

export const IncomeCategoryForm = ({incomeCategory}) => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    return (
        <IncomeCategoryFormProvider incomeCategory={incomeCategory}>
            <h1 className="text-2xl md:text-4xl font-bold text-slate-200 text-center mb-8">
               {id ? "Editar" : "Crear"} Categoría de Ingreso
            </h1>
            <IncomeCategoryFormContainer
                classNames={{
                    form: "flex flex-col space-y-6 bg-gray-800 bg-opacity-30  w-full max-w-xl mx-auto rounded-lg shadow-lg py-8 px-6",
                }}
            >
                <div className="flex flex-col sm:flex-row gap-4">
                    <IncomeCategoryFormName
                        classNames={{
                            base: "w-full",
                            input: "w-full",
                        }}
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <IncomeCategoryFormDescription
                        classNames={{
                            base: "w-full",
                            input: "w-full",
                        }}
                    />
                </div>
                <div>
                    <IncomeCategoryFormStatus
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
            </IncomeCategoryFormContainer>
        </IncomeCategoryFormProvider>
    );
};
