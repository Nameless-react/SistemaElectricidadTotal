import { useContext } from "react";
import { ProjectContext } from "./context/ProjectContext";
import Budget from "./Budget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import style from "/css/projectDashboard.module.css"
import ModalWrapper from "../others/ModalWrapper";
import { Tab, Tabs } from "@nextui-org/tabs";
import AddBudget from "./AddBudget";
import { ScrollShadow } from "@nextui-org/scroll-shadow";



export default function BudgetsModal({ budget, formatNumberToColones }) {
    const { project } = useContext(ProjectContext);

    return (
        <div>
            <ModalWrapper
                modalSize="5xl"
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
                    <Tabs color="primary" classNames={{ tabContent: "text-white font-bold outline-none", cursor: "w-full bg-[#C78824]", panel: "max-h-[310px]" }}>
                        <Tab key="Desglose" title="Desglose" className="flex gap-4 flex-col items-center justify-center">
                            <ScrollShadow className="w-full flex gap-5 flex-col">
                                <div className={style.budgetsHeader}>
                                    <p>Monto</p>
                                    <p>Descripción</p>
                                    <p>Fecha</p>
                                    <p>Encargado</p>
                                </div>
                                {project.projectBudgets.map(budget => (
                                    <Budget {...budget} />
                                ))}

                            </ScrollShadow>
                        </Tab>
                        <Tab key="Solicitud" title="Solicitud">
                            <AddBudget />
                        </Tab>
                    </Tabs>
                )}
            </ModalWrapper>
        </div>
    )
}