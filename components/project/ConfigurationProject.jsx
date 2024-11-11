"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import styles from "/css/projectPage.module.css";
import { useContext, useState } from "react";
import { deleteProjectAction } from "/functions/fetches/projects/projectActions";
import { useRouter } from "next/navigation";
import { ProjectContext } from "./context/ProjectContext";


export default function ConfigurationProject() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [confirmName,setConfirmName] = useState("");
    const { project } = useContext(ProjectContext);
    const { name, idProjects } = project;

    const router =  useRouter();

    const handleChange = (e) => setConfirmName(e.target.value)

    const handleClose = (onClose) => {
        setConfirmName("");
        onClose();
    }
    

    const handleDelete = async (onClose) => {
        await deleteProjectAction(idProjects);
        setConfirmName("");
        onClose();
        router.push("/proyectos")
    }
    
    return (
       <div className={styles.deleteProject}>
            <p>Este proyecto está a punto de ser suspendido. Antes de proceder, asegúrese de que desea confirmar esta acción, ya que la suspensión podría ser irreversible y afectará a todos los participantes y procesos relacionados.</p>
            <Button color="danger" variant="ghost" className="font-bold min-w-40 outline-none" onPress={onOpen}>Suspender Proyecto</Button>
            <Modal backdrop={"blur"} className="dark" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Confirmar Suspensión</ModalHeader>
                    <ModalBody>
                        <p>Para confirmar la suspensión del proyecto escriba "{name}"</p>
                        <Input className="outline-none" type="text" value={confirmName} onChange={handleChange} aria-label="Confirmación de nombre de proyecto" aria-describedby="project-name-helper"/>
                        {confirmName !== name && confirmName.length > 0 && (
                            <p id="project-name-helper" className="text-red-500 text-sm mt-1">
                                El nombre ingresado no coincide con el del proyecto. Por favor, verifíquelo.
                            </p>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={() => handleClose(onClose)}>Cancelar</Button>
                        <Button isDisabled={confirmName !== name} color="primary" onPress={() => handleDelete(onClose)}>Confirmar</Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>    
       </div>
    )
}