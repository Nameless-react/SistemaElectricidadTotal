import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/modal"
import { Button } from "@nextui-org/button";
import { useContext } from "react";
import { ProjectContext } from "./context/ProjectContext";
import Budget from "./Budget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import style from "/css/projectDashboard.module.css"


export default function BudgetsModal({ budget, formatNumberToColones }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { project } = useContext(ProjectContext);
    
    return (
        <div>
            <Button className="w-full h-full rounded-none p-0 m-0" onPress={onOpen}>
                <div>
                    <h3>Presupuesto</h3>
                    <p>{formatNumberToColones(budget)}</p>
                </div>
                <div>
                    <FontAwesomeIcon icon={faCoins} />
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </Button>
            <Modal size="4xl" backdrop={"blur"} className="dark" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="p-12 pt-6">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-bold">Presupuesto y actualizaciones</ModalHeader>
                            <ModalBody>
                                <div className={style.budgetsHeader}>
                                    <p>Monto</p>
                                    <p>Descripción</p>
                                    <p>Fecha</p>
                                    <p>Encargado</p>
                                </div>
                                {project.projectBudgets.map(budget => (
                                    <Budget {...budget}/>
                                ))}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}