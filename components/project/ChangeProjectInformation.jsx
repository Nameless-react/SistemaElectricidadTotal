import { useContext } from "react";
import { ProjectContext } from "./context/ProjectContext";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input"
import style from "/css/projectConfiguration.module.css"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectItem } from "@nextui-org/select";
import { validatePartialProjectClient } from "/functions/validations/projectValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { STATUS_DETAILS } from "/shared/status";
import { updateProjectAction } from "/functions/fetches/projects/projectActions";


export default function ChangeProjectName() {
    const { project } = useContext(ProjectContext);

    const { handleSubmit, control, reset, formState: { errors, isSubmitting }, register, getValues } = useForm({
        resolver: zodResolver(validatePartialProjectClient),
        defaultValues: {
            name: project.name,
            description: project.description,
            idStatus: new Set(String(project.idStatus))
        },
        mode: "onBlur"
    })



    const onSubmit = async (projectFormData) => {
        const resultAction = await updateProjectAction({ ...projectFormData, idProjects: project.idProjects });
        const { successMessage } = await resultAction;
        if (successMessage) {
            // reset();
        }
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.changeProjectName}>
            <p>Actualizar Proyecto</p>
            <div className="flex justify-center items-center w-full gap-6 flex-col">
                <div className="flex items-center justify-center gap-4 w-full">
                    <Input label="Nombre" {...register("name")} isInvalid={errors?.name} errorMessage={errors?.name?.message} className="outline-none rounded-2x w-1/2" classNames={{ inputWrapper: "bg-[#1f2c47] dark:hover:bg-sky-900 dark:active:bg-sky-900 dark:focus:bg-sky-900 dark:focus-within:bg-sky-900" }} />
                    <Controller
                        control={control}
                        name="idStatus"
                        render={({ field: { onChange, value, onBlur } }) => (
                            <Select
                                items={Object.entries(STATUS_DETAILS)}
                                isInvalid={!!errors?.idStatus}
                                errorMessage={errors?.idStatus?.message}
                                classNames={{
                                    popoverContent: "dark bg-[#1f2c47]",
                                    trigger: "min-h-12 py-2 bg-[#1f2c47] dark:hover:bg-sky-900",
                                }}
                                className="w-1/2"
                                aria-label="Seleccionar el estado del proyecto"
                                placeholder="Seleccione el estado del proyecto"
                                selectedKeys={value}
                                onSelectionChange={onChange}
                                onBlur={onBlur}
                                renderValue={(selectedKey) => {
                                    const id = parseInt(selectedKey[0].key);
                                    const [name, status] = Object.entries(STATUS_DETAILS)[id - 1]
                                    return <p key={id} className={`gap-2 text-base font-bold items-center justify-center flex text-[${status.color}]`}><FontAwesomeIcon icon={status.icon}/>{name}</p>
                                }}
                            >
                                {Object.entries(STATUS_DETAILS).map(([name, status], index) => (
                                    <SelectItem key={index + 1} startContent={<FontAwesomeIcon icon={status.icon} />} className={`dark:hover:bg-sky-900 text-[${status.color}]`}>{name}</SelectItem>
                                ))}
                            </Select>
                        )}
                    />
                </div>
                <Textarea label="Descripción" className="w-full" classNames={{ inputWrapper: "dark:hover:bg-sky-900 dark:active:bg-sky-900 dark:focus:bg-sky-900 dark:focus-within:bg-sky-900 bg-[#1f2c47]" }} {...register("description")} isInvalid={errors?.description} errorMessage={errors?.description?.message} />

            </div>
            <Button className="font-bold w-full outline-none" color="success" type="submit" variant="ghost">
                {isSubmitting ? "Enviando..." : "Confirmar"}
                <FontAwesomeIcon className="text-xl" icon={faCircleCheck} />
            </Button>
        </form>
    )
}