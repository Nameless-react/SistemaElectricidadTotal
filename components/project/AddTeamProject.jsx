"use client"
import { useForm } from "react-hook-form"
import { validateNewTeamProjectClient } from "/functions/validations/teamProjectValidations"
import { zodResolver } from "@hookform/resolvers/zod"
import SelectWrapper from "../others/SelectWrapper"
import { Button } from "@nextui-org/button"
import { addTeamWithEmployeesAction } from "/functions/fetches/teams/teamActions"
import { Input } from "@nextui-org/input"
import EmployeeSelect from "./EmployeeSelect"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect } from "react"
import { ProjectContext } from "./context/ProjectContext"
import { SelectItem } from "@nextui-org/select"



export default function AddTeamProject({ onModalClose }) {
    const { project, loadProjectData } = useContext(ProjectContext);
    const selectStyles = {
        popoverContent: "dark  bg-[#1f2c47]",
        trigger: "min-h-12 py-2 bg-[#1f2c47] dark:hover:bg-sky-900"
    }


    const { employees } = useContext(ProjectContext)
    const { handleSubmit, control, formState: { errors, isSubmitting }, register, reset } = useForm({
        resolver: zodResolver(validateNewTeamProjectClient),
        defaultValues: {
            name: "",
            employees: new Set()
        },
        mode: "onBlur"
    })


    const onSubmit = async (teamProjectFormData) => {
        const { successMessage } = await addTeamWithEmployeesAction(teamProjectFormData);
        if (successMessage) {
            reset();
            onModalClose();
        }
    }


    const renderValuesEmployees = (selectedEmployees) => {
        return (
            <div className="flex gap-3 flex-wrap">
                {Array.from(selectedEmployees).map(employeeId => {
                    const employee = employees.find(emp => emp.idEmployee === parseInt(employeeId.data.idEmployee));
                    return (
                        <p className="bg-[#C78824] px-4 py-2 rounded-2xl" key={employee?.idEmployee}>{employee?.email}</p>
                    );
                })}
            </div>
        )
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center gap-10 items-center py-9 px-5 flex-col">
            <Input label="Nombre del equipo" {...register("name")} isInvalid={errors?.name} errorMessage={errors?.name?.message} classNames={{ inputWrapper: "bg-[#1f2c47] dark:hover:bg-sky-900 dark:active:bg-sky-900 dark:focus:bg-sky-900 dark:focus-within:bg-sky-900" }}/>
            <SelectWrapper control={control} name="employees" items={employees} isMultiline={true} selectionMode="multiple" errors={errors} className="w-full" classNames={selectStyles} label="Seleccione los empleados" renderValue={renderValuesEmployees}>
                {(employee) => <SelectItem key={employee.idEmployee}><EmployeeSelect {...employee} /></SelectItem>}
            </SelectWrapper>

            <Button size="sm" className="bg-green-600 self-end text-sm text-white font-bold py-6 px-8 rounded-2xl mt-8" type="submit">
                {isSubmitting ? "Enviando..." : "Confirmar"}
                <FontAwesomeIcon className="text-xl" icon={faCircleCheck} />
            </Button>
        </form>
    )
}