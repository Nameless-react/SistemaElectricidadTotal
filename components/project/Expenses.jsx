import { useContext } from "react";
import { ProjectContext } from "./context/ProjectContext";
import Expense from "./Expense";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCashRegister, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import style from "/css/projectDashboard.module.css"
import ModalWrapper from "../others/ModalWrapper";


export default function ExpensesModal({ expense, formatNumberToColones }) {
    const { project } = useContext(ProjectContext);

    return (
        <div>
            <ModalWrapper
                modalTitle="Gastos"
                modalSize="4xl"
                classNameButton="w-full h-full rounded-none p-0 m-0"
                buttonComponent={
                    <>
                        <div>
                            <h3>Gastos</h3>
                            <p>{formatNumberToColones(expense)}</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faCashRegister} />
                            <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </>

                }>

                {(onClose) => (
                    <>
                        <div className={style.expensesHeader}>
                            <p>Monto</p>
                            <p>Descripción</p>
                            <p>Fecha</p>
                            <p>Encargado</p>
                        </div>
                        {project.expensesProjects.map(expense => (
                            <Expense {...expense} />
                        ))}
                    </>
                )}
            </ModalWrapper>
        </div>
    )
}