import { useContext } from "react";
import { ProjectContext } from "./context/ProjectContext";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input"
import style from "/css/projectConfiguration.module.css"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectItem } from "@nextui-org/select";
import { projectPartialValidations } from "../../functions/validations/projectValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPlay, faClock, faPause } from "@fortawesome/free-solid-svg-icons";



export default function ChangeProjectName() {
    const { project } = useContext(ProjectContext);
    console.log(project.idStatus)


    const { handleSubmit, control, reset, formState: { errors, isSubmitting }, register } = useForm({
        resolver: zodResolver(projectPartialValidations),
        defaultValues: {
            name: project.name,
            description: project.description,
            idStatus: new Set(String(project.idStatus))
        },
        mode: "onBlur"
    })


    
    const onSubmit = async (projectFormData) => {
        const resultAction = updateProjectAction({ ...projectFormData, idProjects: project.idProjects });
        const { successMessage } = await resultAction;
        if (successMessage) {
            reset(); 
        }
    }



    return (
        <form className={style.changeProjectName} onSubmit={handleSubmit(onSubmit)}>
            <p>Actualizar Proyecto</p>
            <div className="flex justify-center items-center w-full gap-6 flex-col">
               <div className="flex items-center justify-center gap-4 w-full">
                    <Input label="Nombre" {...register("name")} className="outline-none rounded-2x w-1/2" classNames={{ input: "bg-transparent", inputWrapper: "bg-[#1f2c47] hover:bg-[#2e4068] focus:bg-transparent active:bg-transparent"}} />
                    <Controller
                        control={control}
                        name="idStatus"
                        render={({ field: { onChange, value, onBlur } }) => (
                            <Select
                                isInvalid={!!errors?.idStatus}
                                errorMessage={errors?.idStatus?.message}
                                classNames={{
                                    popoverContent: "dark",
                                    trigger: "min-h-12 py-2"
                                }}
                                className="w-1/2"
                                aria-label="Seleccionar el estado del proyecto"
                                placeholder="Seleccione el estado del proyecto"
                                selectedKeys={value}
                                defaultSelectedKeys={value}
                                onSelectionChange={onChange}
                                onBlur={onBlur}
                                renderValue={(selectedKey) => <p className="gap-2 flex text-[#FFD700]"><FontAwesomeIcon icon={faClock}/>Pendiente</p>}
                            >
                                <SelectItem key={1} startContent={<FontAwesomeIcon icon={faClock}/>} className="text-[#FFD700]">Pendiente</SelectItem>
                                <SelectItem key={2} startContent={<FontAwesomeIcon icon={faPlay}/>} className="text-[#FFA500]">En progreso</SelectItem>
                                <SelectItem key={3} startContent={<FontAwesomeIcon icon={faCircleCheck}/>} className="text-[#32CD32]">Terminado</SelectItem>
                                <SelectItem key={4} startContent={<FontAwesomeIcon icon={faPause}/>} className="text-[#FF4500]">En espera</SelectItem>
                            </Select>
                        )}
                    />  
               </div>

               <Textarea label="Descripción" className="dark w-full" {...register("description")} isInvalid={errors?.description} errorMessage={errors?.description?.message} />
                
                <Button className="font-bold min-w-80" color="success" variant="ghost">
                    {isSubmitting ? "Enviando..." : "Confirmar"}
                    <FontAwesomeIcon className="text-xl" icon={faCircleCheck} />
                </Button>
            </div>
        </form>
    )    
}