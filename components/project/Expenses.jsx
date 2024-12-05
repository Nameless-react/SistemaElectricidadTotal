import { useContext } from "react";
import { ProjectContext } from "./context/ProjectContext";
import Expense from "./Expense";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCashRegister, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import style from "/css/projectDashboard.module.css"
import ModalWrapper from "../others/ModalWrapper";
import { Tab, Tabs } from "@nextui-org/tabs";
import AddExpense from "./AddExpense";
import { ScrollShadow } from "@nextui-org/scroll-shadow";




export default function ExpensesModal({ expense, formatNumberToColones }) {
    const { project } = useContext(ProjectContext);

    return (
        <div>
            <ModalWrapper
                modalTitle="Gastos"
                modalSize="5xl"
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
                    <Tabs color="primary" classNames={{ tabContent: "text-white font-bold outline-none", cursor: "w-full bg-[#C78824]", panel: "max-h-[320px]" }}>
                        <Tab key="Desglose" title="Desglose" className="flex gap-4 flex-col items-center justify-center">
                            <ScrollShadow key="ScrollShadowExpenses" className="w-full flex gap-5 flex-col">
                                <div className={style.expensesHeader}>
                                    <p>Monto</p>
                                    <p>Descripción</p>
                                    <p>Fecha</p>
                                    <p>Encargado</p>
                                </div>
                                {project.expensesProjects.map((expense, index) => (
                                    <Expense key={index} {...expense} />
                                ))}
                            </ScrollShadow>
                        </Tab>
                        <Tab key="Solicitud" title="Solicitud">
                            <AddExpense />
                        </Tab>
                    </Tabs>
                )}
            </ModalWrapper>
        </div>
    )
}