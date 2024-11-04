import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/modal"
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { Avatar } from "@nextui-org/avatar";
import { useContext } from "react";
import { ProjectContext } from "./context/ProjectContext";


export default function ModalAddEmployees() {

    const { project, employees } = useContext(ProjectContext);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // const { register, handleSubmit, control, reset, formState: { errors, isSubmitting }, getValues } = useForm({
    //     resolver: zodResolver(validateTaskClient),
    //     defaultValues: {
    //         title: "",
    //         description: "",
    //         deadline: "",
    //         employees: new Set(),
    //         idStatus: 2,
    //         idProjects: project.idProjects
    //     },
    //     mode: "onBlur"
    // })

    // const onSubmit = async (taskFormData) => {
    //     const { successMessage } = await createTaskAction(taskFormData);
    //     if (successMessage) {
    //         reset();
    //     }
    // }
    return (
        <div>
            <Button className="max-w-10 outline-none bg-green-700 text-xl" onPress={onOpen}>+</Button>
            <Modal size="2xl" backdrop={"blur"} className="dark" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Administrar Empleados</ModalHeader>
                            <ModalBody>
                                <form className="flex justify-center gap-10 items-center flex-col">

                                <Select
                                                items={employees}
                                                isMultiline={true}
                                                // isInvalid={!!errors?.employees}
                                                // errorMessage={errors?.employees?.message}
                                                classNames={{
                                                    popoverContent: "dark",
                                                    trigger: "min-h-12 py-2"
                                                }}
                                                aria-label="Seleccionar empleados para la tarea"
                                                placeholder="Seleccione los empleados"
                                                selectionMode="multiple"
                                                // selectedKeys={value}
                                                // onSelectionChange={onChange}
                                                // onBlur={onBlur}
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

                                        {/* <Button size="sm" onPress={onClose} className="bg-green-600 self-end text-sm text-white font-bold py-6 px-8 rounded-2xl mt-8" type="submit">
                                            {isSubmitting ? "Enviando..." : "Confirmar"}
                                            <FontAwesomeIcon className="text-xl" icon={faCircleCheck} />
                                        </Button> */}
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}