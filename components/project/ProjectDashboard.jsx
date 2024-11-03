"use client"
import { formatNumberToColones } from "/functions/others/moneyFormat";
import Task from "./Task";
import Employee from "./Employee";
import style from "/css/projectDashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faCashRegister, faWallet } from "@fortawesome/free-solid-svg-icons";
import ModalAddEmployees from "./ModalAddEmployees";
import ModalCreateTask from "./ModalCreateTask"; 
import { useContext } from "react";
import { ProjectContext } from "./context/ProjectContext";
import { CircularProgress } from "@nextui-org/progress";



// *Fix the scroll bar in employees and tasks

export default function ProjectDashboard() {
    const { project } = useContext(ProjectContext);
    const { percentage, employees, tasks, budget } = project;
    const expenses = budget;

    return (
        <div className={style.container}>
            <div className={style.overviewProject}>
                <div>
                    <div>
                        <h3>Presupuesto</h3>
                        <p>{formatNumberToColones(budget)}</p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faCoins} />
                    </div>
                </div>
                <div>
                    <div>
                        <h3>Gastos</h3>
                        <p>{formatNumberToColones(expenses)}</p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faCashRegister} />
                    </div>
                </div>
                <div>
                    <div>
                        <h3>Saldo restante</h3>
                        <p>{formatNumberToColones(budget - expenses)}</p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faWallet} />
                    </div>
                </div>
            </div>
            <div className={style.overviewGraphs}>
                <CircularProgress
                    classNames={{
                        svg: "w-full h-full drop-shadow-md",
                        indicator: "stroke-[#F1B217]",
                        track: "stroke-white/10",
                        value: "text-3xl font-semibold text-white",
                    }}
                    value={parseInt(percentage)}
                    strokeWidth={4}
                    showValueLabel={true}
                />
            </div>
            <div className={style.tasksContainer}>
                <div className={style.taskHeader}>
                    <h3>Tareas</h3>
                    <ModalCreateTask />
                </div>
                <div className={style.tasks}>
                    {tasks.length === 0 ? <p className="font-bold">No hay tareas creadas</p> : tasks.map(task => (
                        <Task 
                            {...task}
                        />
                    ))}
                </div>
            </div>
            <div className={style.projectFiles}>

            </div>

            <div className={style.employeesContainer}>
                <div className={style.employeeHeader}>
                    <h3>Empleados Asignados</h3>
                    <ModalAddEmployees />
                </div>
                <div className={style.employees}>
                    {employees.length === 0 ? <p className="font-bold">No hay empleados asignados</p> : employees.map(employee => (
                        <Employee 
                            {...employee}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}