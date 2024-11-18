"use client"
import { Button } from "@nextui-org/button";
import { SelectItem } from "@nextui-org/select";
import { useContext } from "react";
import { ProjectContext } from "./context/ProjectContext";
import { validateTeamProjectClient } from "/functions/validations/teamProjectValidations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { changeTeamProjectEmployeeAction } from "/functions/fetches/teams/teamActions";
import ModalWrapper from "../others/ModalWrapper";
import { useRouter } from "next/navigation";
import SelectWrapper from "../others/SelectWrapper";
import EmployeeSelect from "./EmployeeSelect";


export default function ModalAddEmployees() {
    const router = useRouter();
    const { project, loadProjectData, employees } = useContext(ProjectContext);

    const selectStyles = {
        popoverContent: "dark",
        trigger: "min-h-12 py-2 dark"
    }

    const renderValuesEmployees = (selectedEmployees) => {
        return (
            <div className="flex gap-3 flex-wrap">
                {Array.from(selectedEmployees).map(employeeId => {
                    const employee = project.employees.find(emp => emp.idEmployee === parseInt(employeeId.data.idEmployee));
                    return (
                        <p className="bg-[#C78824] px-4 py-2 rounded-2xl" key={employee?.idEmployee}>{employee?.email}</p>
                    );
                })}
            </div>
        )
    }

    const { handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(validateTeamProjectClient),
        defaultValues: {
            idTeamProject: project.idTeamProject,
            employees: new Set(project?.employees?.map(employee => String(employee.idEmployee))) || new Set()
        },
        mode: "onBlur"
    })

    const onSubmit = async (employeesFormData) => {
        const { successMessage } = await changeTeamProjectEmployeeAction(employeesFormData);
        if (successMessage) {
            await loadProjectData(project?.idProjects)
            reset();
            // router.refresh()
        }
    }
    return (
        <div>
            <ModalWrapper modalTitle="Administrar Empleados">
                {({ onClose }) => (
                    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center gap-10 items-center flex-col">
                        <SelectWrapper control={control} name="employees" items={employees} isMultiline={true} selectionMode="multiple" errors={errors} className="w-full" classNames={selectStyles} label="Seleccione los empleados" renderValue={renderValuesEmployees}>
                            {(employee) => <SelectItem key={employee.idEmployee}><EmployeeSelect {...employee} /></SelectItem>}
                        </SelectWrapper>

                        <Button size="sm" onPress={onClose} className="bg-green-600 self-end text-sm text-white font-bold py-6 px-8 rounded-2xl mt-8" type="submit">
                            {isSubmitting ? "Enviando..." : "Confirmar"}
                            <FontAwesomeIcon className="text-xl" icon={faCircleCheck} />
                        </Button>
                    </form>
                )}
            </ModalWrapper>
        </div>
    )
}