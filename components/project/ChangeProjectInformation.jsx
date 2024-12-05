"use client"
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input"
import style from "/css/projectConfiguration.module.css"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectItem } from "@nextui-org/select";
import { validatePartialProjectClient } from "/functions/validations/projectValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { STATUS_DETAILS } from "/shared/status";
import SelectWrapper from "../others/SelectWrapper";
import { updateProjectAction, saveProjectAction } from "/functions/fetches/projects/projectActions";
import { getTeamsProjectAction } from "/functions/fetches/teams/teamActions";
import AddTeamProject from "./AddTeamProject";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { useRouter } from "next/navigation";


//* Add to the form of create the field to add images or files
export default function ChangeProjectInformation({ project, loadProjectData }) {
    const router = useRouter();
    const [teams, setTeams] = useState([]);
    const [isModalClose, setModalClose] = useState(true)


    const selectStyles = {
        popoverContent: "dark bg-[#1f2c47]",
        trigger: "min-h-12 py-2 bg-[#1f2c47] dark:hover:bg-sky-900"
    }

    const { handleSubmit, control, formState: { errors, isSubmitting }, register, getValues } = useForm({
        resolver: zodResolver(validatePartialProjectClient),
        defaultValues: {
            name: project?.name || "",
            description: project?.description || "",
            idStatus: project?.idStatus ? new Set(String(project?.idStatus)) : new Set("2"),
            idTeamProject: project?.idTeamProject ? new Set([project.idTeamProject.toString()]) : new Set()
        },
        mode: "onBlur"
    })




    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const data = await getTeamsProjectAction();
                setTeams(data);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };

        fetchTeams();
    }, [isModalClose]);


    const onSubmit = async (projectFormData) => {
        const resultAction = project ? updateProjectAction({ ...projectFormData, idProjects: project.idProjects }) : saveProjectAction(projectFormData);
        const { successMessage } = await resultAction;
        if (successMessage) {
            // reset();
            if (!project) router.push("/proyectos")
            else await loadProjectData(project.idProjects)
        }
    }

    const renderValueStatus = (selectedKey) => {
        const id = parseInt(selectedKey[0].key);
        const [name, status] = Object.entries(STATUS_DETAILS)[id - 1]
        return <p key={id} className="gap-2 text-base font-bold items-center justify-center flex" style={{ color: status.color }}><FontAwesomeIcon icon={status.icon} />{name}</p>
    }

    const renderValueTeam = (selectedKeys) => {
        console.log(selectedKeys);
        return selectedKeys.map(selectedKey => (
            <p key={selectedKey.data.idTeamProject} className="gap-2 text-base font-bold items-center justify-center flex">
                {selectedKey.data.name}
            </p>
        ))
    };

    const handleOnModalClose = () => setModalClose(prevValue => !prevValue);


    return (
        <div className="flex align-center justify-center gap-8 flex-col w-full">
            <form onSubmit={handleSubmit(onSubmit)} className={style.changeProjectName}>
                <h3>{project ? "Actualizar Proyecto" : "Crear Proyecto"}</h3>
                <div className="flex justify-center items-center w-full gap-6 flex-col">
                    <Input label="Nombre" {...register("name")} isInvalid={errors?.name} errorMessage={errors?.name?.message} className="outline-none rounded-2x w-full" classNames={{ inputWrapper: "bg-[#1f2c47] dark:hover:bg-sky-900 dark:active:bg-sky-900 dark:focus:bg-sky-900 dark:focus-within:bg-sky-900" }} />
                    <div className="flex items-center justify-center gap-2 w-full">
                        {project?.idStatus &&
                            <SelectWrapper className="w-1/2" label="Seleccione el estado" control={control} name="idStatus" items={Object.entries(STATUS_DETAILS)} errors={errors} classNames={selectStyles} renderValue={renderValueStatus}>
                                {Object.entries(STATUS_DETAILS).map(([name, status], index) => (
                                    <SelectItem key={index + 1} startContent={<FontAwesomeIcon icon={status.icon} />} className="dark:hover:bg-sky-900" style={{ color: status.color }}>{name}</SelectItem>
                                ))}
                            </SelectWrapper>
                        }


                        <SelectWrapper className={`${project ? 'w-1/2' : 'w-full'}`} label="Seleccione el equipo" control={control} name="idTeamProject" items={teams} errors={errors} classNames={selectStyles} renderValue={renderValueTeam}>
                            {(team) => <SelectItem key={team.idTeamProject} className="dark:hover:bg-sky-900">{team.name}</SelectItem>}
                        </SelectWrapper>

                    </div>
                    <Textarea label="Descripción" className="w-full" classNames={{ inputWrapper: "dark:hover:bg-sky-900 dark:active:bg-sky-900 dark:focus:bg-sky-900 dark:focus-within:bg-sky-900 bg-[#1f2c47]" }} {...register("description")} isInvalid={errors?.description} errorMessage={errors?.description?.message} />

                </div>
                <Button className="font-bold w-full outline-none" color="success" type="submit" variant="ghost">
                    {isSubmitting ? "Enviando..." : "Confirmar"}
                    <FontAwesomeIcon className="text-xl" icon={faCircleCheck} />
                </Button>
            </form>

            {!project &&
                <Accordion variant="splitted">
                    <AccordionItem title="Crear Equipo" startContent={<FontAwesomeIcon className="text-2xl" icon={faPlusCircle} />} className="bg-[#182237]" classNames={{ title: "font-bold text-2xl"}}>
                        <AddTeamProject onModalClose={handleOnModalClose} />
                    </AccordionItem>
                </Accordion>
            }
        </div>
    )
}