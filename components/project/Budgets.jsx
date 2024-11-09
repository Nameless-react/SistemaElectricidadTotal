import { useContext } from "react";
import { ProjectContext } from "./context/ProjectContext";
import Budget from "./Budget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import style from "/css/projectDashboard.module.css"
import ModalWrapper from "../others/ModalWrapper";

export default function BudgetsModal({ budget, formatNumberToColones }) {
    const { project } = useContext(ProjectContext);

    return (
        <div>
            <ModalWrapper
                modalSize="4xl"
                classNameButton="w-full h-full rounded-none p-0 m-0"
                modalTitle="Presupuesto y actualizaciones"
                buttonComponent={
                    <>
                        <div>
                            <h3>Presupuesto</h3>
                            <p>{formatNumberToColones(budget)}</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faCoins} />
                            <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </>
                }

            >
                {(onClose) => (
                    <>
                        <div className={style.budgetsHeader}>
                            <p>Monto</p>
                            <p>Descripción</p>
                            <p>Fecha</p>
                            <p>Encargado</p>
                        </div>
                        {project.projectBudgets.map(budget => (
                            <Budget {...budget} />
                        ))}

                    </>
                )}
            </ModalWrapper>
        </div>
    )
}