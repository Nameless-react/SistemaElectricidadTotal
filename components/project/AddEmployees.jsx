"use client"
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { Avatar } from "@nextui-org/avatar";
import { useContext } from "react";
import { ProjectContext } from "./context/ProjectContext";
import { validateTeamProjectClient } from "/functions/validations/teamProjectValidations";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { changeTeamProjectEmployeeAction } from "/functions/fetches/teams/teamActions";
import ModalWrapper from "../others/ModalWrapper";



export default function ModalAddEmployees() {
    const { project, employees } = useContext(ProjectContext);


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
            reset();
        }
    }
    return (
        <div>
            <ModalWrapper modalTitle="Administrar Empleados">
                {({ onClose }) => (
                    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center gap-10 items-center flex-col">
                        <Controller
                            control={control}
                            name="employees"
                            render={({ field: { onChange, value, onBlur } }) => (
                                <Select
                                    items={employees}
                                    isMultiline={true}
                                    selectionMode="multiple"
                                    isInvalid={!!errors?.employees}
                                    errorMessage={errors?.employees?.message}
                                    classNames={{
                                        popoverContent: "dark",
                                        trigger: "min-h-12 py-2"
                                    }}
                                    aria-label="Seleccionar empleados para la tarea"
                                    placeholder="Seleccione los empleados"
                                    selectedKeys={value}
                                    onSelectionChange={(selected) => {
                                        onChange(new Set(selected));
                                    }}
                                    onBlur={onBlur}
                                    renderValue={(selectedEmployees) => {
                                        return <div className="flex gap-3 flex-wrap">
                                            {Array.from(selectedEmployees).map(employeeId => {
                                                const employee = employees.find(emp => emp.idEmployee === parseInt(employeeId.data.idEmployee));
                                                return (
                                                    <p className="bg-[#C78824] px-4 py-2 rounded-2xl" key={employee?.idEmployee}>{employee?.email}</p>
                                                );
                                            })}
                                        </div>
                                    }}
                                >
                                    {(employee) => (
                                        <SelectItem key={employee.idEmployee}>
                                            <div className="flex items-center gap-2">
                                                <Avatar
                                                    alt={employee.name}
                                                    className="flex-shrink-0"
                                                    size="sm"
                                                    src={employee.image}
                                                />
                                                <div className="flex flex-col">
                                                    <span>{employee.name}</span>
                                                    <span className="text-default-500 text-tiny">({employee.email})</span>
                                                </div>
                                            </div>
                                        </SelectItem>
                                    )}
                                </Select>
                            )}
                        />

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