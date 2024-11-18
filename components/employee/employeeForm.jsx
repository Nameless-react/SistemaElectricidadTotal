'use client'
import { Button } from "@nextui-org/button";
import { EmployeeFormProvider } from "./compound_components/contexts/employeeContext";
import { EmployeeFormContainer, EmployeeFormJob, EmployeeUsersDropDown } from "./compound_components/employeeFormComponents";
import { useSearchParams } from "next/navigation";

export function EmployeeForm({ employee, users }) {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    return (
        <EmployeeFormProvider employee={employee} users={users}>
            <EmployeeFormContainer classNames={{
                form: "flex flex-col space-y-6 bg-gray-800 bg-opacity-30  w-full max-w-xl mx-auto rounded-lg shadow-lg py-8 px-6",
            }}>
                <div className="flex flex-col sm:flex-row gap-4">
                    <EmployeeFormJob classNames={
                        {
                            base: "w-full",
                            input: "w-full",
                        }
                    } />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <EmployeeUsersDropDown  classNames={{
                            base: "w-full",
                            button: "w-full",
                        }} />
                </div>
                <Button
                    type="submit"
                    className={`w-full sm:w-1/2 mx-auto ${id? " bg-blue-700 hover:bg-blue-700":" bg-green-600 hover:bg-green-700"} transition-all text-white`}
                >
                    Guardar
                </Button>
            </EmployeeFormContainer>
        </EmployeeFormProvider>
    );
}