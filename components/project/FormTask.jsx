"use client"
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { DatePicker } from "@nextui-org/date-picker";
import { I18nProvider } from "@react-aria/i18n";
import { useForm, Controller } from "react-hook-form";
import { validateTaskClient, validatePartialTaskClient } from "/functions/validations/taskValidation";
import { createTaskAction, updateTaskAction } from "/functions/fetches/projects/taskActions"
import { zodResolver } from "@hookform/resolvers/zod"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useContext, useMemo, useEffect } from "react";
import { ProjectContext } from "./context/ProjectContext";
import { Avatar } from "@nextui-org/avatar";
import { getDateTask } from "/functions/others/dateTime";
import { today, getLocalTimeZone } from "@internationalized/date";



export default function FormTask({ idTasks, title, deadline, description, idStatus, employees, isOpen, onClose }) {
    const { project } = useContext(ProjectContext);
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(idTasks ? validatePartialTaskClient : validateTaskClient),
        defaultValues: {
            title: title || "",
            description: description || "",
            deadline: getDateTask(deadline),
            employees: new Set(employees?.map(employee => String(employee.idEmployee))) || new Set(),
            idStatus: idStatus || 2,
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
            reset(); 
            onClose()
        }
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
            <Controller
                control={control}
                name="employees"
                render={({ field: { onChange, value, onBlur } }) => (
                    <Select
                        items={project.employees}
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
                          return  <div className="flex gap-3 flex-wrap">
                                {Array.from(selectedEmployees).map(employeeId => {
                                    const employee = project.employees.find(emp => emp.idEmployee === parseInt(employeeId.data.idEmployee));
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
            <Textarea aria-label="Descripción de la tarea" label="Descripción" {...register("description")} isInvalid={errors?.description} errorMessage={errors?.description?.message} />

            <Button size="sm" className="bg-green-600 self-end text-sm text-white font-bold py-6 px-8 rounded-2xl mt-8" type="submit">
                {isSubmitting ? "Enviando..." : "Confirmar"}
                <FontAwesomeIcon className="text-xl" icon={faCircleCheck} />
            </Button>
        </form>
    )
}