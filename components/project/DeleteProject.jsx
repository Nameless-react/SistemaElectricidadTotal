"use client"
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import styles from "/css/projectConfiguration.module.css";
import { useContext, useState } from "react";
import { deleteProjectAction } from "/functions/fetches/projects/projectActions";
import { useRouter } from "next/navigation";
import { ProjectContext } from "./context/ProjectContext";
import ModalWrapper from "../others/ModalWrapper";

export default function DeleteProject() {
    const { project } = useContext(ProjectContext);
    const [confirmName,setConfirmName] = useState("");
    const { name, idProjects } = project;


    const router =  useRouter();
    const handleChange = (e) => setConfirmName(e.target.value)

    const handleDelete = async (onClose) => {
        await deleteProjectAction(idProjects);
        setConfirmName("");
        onClose();
        router.push("/proyectos")
    }


    return (
        <div className={styles.deleteProject}>
            <p>Este proyecto está a punto de ser suspendido. Antes de proceder, asegúrese de que desea confirmar esta acción, ya que la suspensión podría ser irreversible y afectará a todos los participantes y procesos relacionados.</p>
            <ModalWrapper modalTitle="Confirmar Suspensión" colorButton="danger" variantButton="ghost" classNameButton="font-bold min-w-44 outline-none px-2" buttonComponent="Suspender Proyecto" modalSize="xl">
                {(onClose) => (
                    <>
                        <p>Para confirmar la suspensión del proyecto escriba "{name}"</p>
                        <Input className="outline-none" type="text" value={confirmName} onChange={handleChange} aria-label="Confirmación de nombre de proyecto" aria-describedby="project-name-helper"/>
                        {confirmName !== name && confirmName.length > 0 && (
                            <p id="project-name-helper" className="text-red-500 text-sm mt-1">
                                El nombre ingresado no coincide con el del proyecto. Por favor, verifíquelo.
                            </p>
                        )}
                    
                        <Button color="danger" variant="light" onPress={() => handleClose(onClose)}>Cancelar</Button>
                        <Button isDisabled={confirmName !== name} color="primary" onPress={() => handleDelete(onClose)}>Confirmar</Button>
                    </>
                )}
            </ModalWrapper>    
       </div>
    )
}