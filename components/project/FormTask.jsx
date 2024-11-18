"use client"
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { SelectItem } from "@nextui-org/select";
import { DatePicker } from "@nextui-org/date-picker";
import { I18nProvider } from "@react-aria/i18n";
import { useForm, Controller } from "react-hook-form";
import { validateTaskClient, validatePartialTaskClient } from "/functions/validations/taskValidation";
import { createTaskAction, updateTaskAction } from "/functions/fetches/projects/taskActions"
import { zodResolver } from "@hookform/resolvers/zod"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import { ProjectContext } from "./context/ProjectContext";
import { getDateTask } from "/functions/others/dateTime";
import { today, getLocalTimeZone } from "@internationalized/date";
import { STATUS_DETAILS } from "/shared/status";
import SelectWrapper from "../others/SelectWrapper";
import EmployeeSelect from "./EmployeeSelect";



export default function FormTask({ idTasks, title, deadline, description, idStatus, employees, isOpen, onClose }) {
    const { project, loadProjectData } = useContext(ProjectContext);
    const selectStyles = {
        popoverContent: "dark",
        trigger: "min-h-12 py-2 dark"
    }

    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(idTasks ? validatePartialTaskClient : validateTaskClient),
        defaultValues: {
            title: title || "",
            description: description || "",
            deadline: getDateTask(deadline),
            employees: new Set(employees?.map(employee => String(employee.idEmployee))) || new Set(),
            idStatus: idStatus ? new Set(String(idStatus)) : new Set("2"),
            idProjects: project.idProjects
        },
        mode: "onBlur"
    })

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);


    const onSubmit = async (taskFormData) => {
        const resultAction = idTasks ? updateTaskAction({ ...taskFormData, idTasks }) : createTaskAction(taskFormData);
        const { successMessage } = await resultAction;
        if (successMessage) {
            await loadProjectData(project?.idProjects)
            reset();
            onClose();
        }
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


    const renderValueStatus = (selectedKey) => {
        const id = parseInt(selectedKey[0].key);
        const [name, status] = Object.entries(STATUS_DETAILS)[id - 1]
        return (
            <p key={id} className="gap-2 text-base font-bold items-center justify-center flex" style={{ color: status.color }}>
                <FontAwesomeIcon icon={status.icon} />
                {name}
            </p>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center gap-10 items-center flex-col">
            <Input label="Título" className="outline-none" type="text" aria-label="Título de la tarea" {...register("title")} isInvalid={errors?.title} errorMessage={errors?.title?.message} />
            <div className="dark justify-center w-full">
                <I18nProvider locale="cr">
                    <Controller
                        control={control}
                        name="deadline"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <DatePicker
                                label="Fecha Límite"
                                shouldForceLeadingZeros
                                isRequired
                                aria-label="Fecha límite para la tarea"
                                dateInputClassNames={{
                                    input: "items-center",
                                }}
                                minValue={today(getLocalTimeZone())}
                                className="items-center"
                                classNames={{
                                    calendar: "dark",
                                    popoverContent: "dark",
                                }}
                                onChange={onChange}
                                onBlur={onBlur}
                                defaultValue={value}
                                isInvalid={!!errors?.deadline}
                                errorMessage={errors?.deadline?.message}
                            />
                        )}
                    />
                </I18nProvider>
            </div>


            <SelectWrapper control={control} name="employees" items={project.employees} isMultiline={true} selectionMode="multiple" errors={errors} className="w-full" classNames={selectStyles} label="Seleccione los empleados" renderValue={renderValuesEmployees}>
                {(employee) => <SelectItem key={employee.idEmployee}><EmployeeSelect {...employee} /></SelectItem>}
            </SelectWrapper>


            {idStatus && <SelectWrapper className="w-full" label="Seleccione el estado" control={control} name="idStatus" items={Object.entries(STATUS_DETAILS)} errors={errors} classNames={selectStyles} renderValue={renderValueStatus}>
                {Object.entries(STATUS_DETAILS).map(([name, status], index) => (
                    <SelectItem key={index + 1} startContent={<FontAwesomeIcon icon={status.icon} />} className="dark:hover:bg-sky-900" style={{ color: status.color }}>{name}</SelectItem>
                ))}
            </SelectWrapper>}

            <Textarea aria-label="Descripción de la tarea" label="Descripción" {...register("description")} isInvalid={errors?.description} errorMessage={errors?.description?.message} />

            <Button size="sm" className="bg-green-600 self-end text-sm text-white font-bold py-6 px-8 rounded-2xl mt-8" type="submit">
                {isSubmitting ? "Enviando..." : "Confirmar"}
                <FontAwesomeIcon className="text-xl" icon={faCircleCheck} />
            </Button>
        </form>
    )
}