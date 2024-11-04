import { Modal, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure } from "@nextui-org/modal"
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { DatePicker } from "@nextui-org/date-picker";
import { I18nProvider } from "@react-aria/i18n";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useForm, Controller } from "react-hook-form";
import { validateTaskClient } from "/functions/validations/taskValidation";
import { createTaskAction } from "/functions/fetches/projects/taskActions"
import { zodResolver } from "@hookform/resolvers/zod"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ProjectContext } from "./context/ProjectContext";
import { Avatar } from "@nextui-org/avatar";



export default function ModalCreateTask() {
    const { project } = useContext(ProjectContext);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting }, getValues } = useForm({
        resolver: zodResolver(validateTaskClient),
        defaultValues: {
            title: "",
            description: "",
            deadline: "",
            employees: new Set(),
            idStatus: 2,
            idProjects: project.idProjects
        },
        mode: "onBlur"
    })

    const onSubmit = async (taskFormData) => {
        const { successMessage } = await createTaskAction(taskFormData);
        if (successMessage) {
            reset();
        }
    }

    return (
        <div>
            <Button className="max-w-10 outline-none bg-green-700 text-xl" onPress={onOpen}>+</Button>
            <Modal size="2xl" backdrop={"blur"} className="dark" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Crear Tarea</ModalHeader>
                            <ModalBody>
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
                                                isInvalid={!!errors?.employees}
                                                errorMessage={errors?.employees?.message}
                                                classNames={{
                                                    popoverContent: "dark",
                                                    trigger: "min-h-12 py-2"
                                                }}
                                                aria-label="Seleccionar empleados para la tarea"
                                                placeholder="Seleccione los empleados"
                                                selectionMode="multiple"
                                                selectedKeys={value}
                                                onSelectionChange={onChange}
                                                onBlur={onBlur}
                                                renderValue={(employees) => {
                                                    return (<div className="flex gap-3 flex-wrap">
                                                        {employees.map(employee => <p className="bg-[#C78824] px-4 py-2 rounded-2xl">{employee.data.email}</p>)}
                                                    </div>)
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
                                    {console.log(project.employees)}
                                    <Textarea aria-label="Descripción de la tarea" label="Descripción" {...register("description")} isInvalid={errors?.description} errorMessage={errors?.description?.message} />

                                    <Button size="sm" onPress={onClose} className="bg-green-600 self-end text-sm text-white font-bold py-6 px-8 rounded-2xl mt-8" type="submit">
                                        {isSubmitting ? "Enviando..." : "Confirmar"}
                                        <FontAwesomeIcon className="text-xl" icon={faCircleCheck} />
                                    </Button>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}