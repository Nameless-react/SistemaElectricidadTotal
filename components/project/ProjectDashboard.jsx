import Task from "./Task";
import style from "/css/projectDashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faCashRegister, faWallet } from "@fortawesome/free-solid-svg-icons";
import { faPause, faPlay, faClock, faCheckCircle, faQuestionCircle, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Status from "./Status";
import Link from "next/link";

function formatNumberToColones(number) {
    if (isNaN(number)) {
        throw new Error('El valor proporcionado no es un número válido.');
    }


    const formatter = new Intl.NumberFormat('es-CR', {
        style: 'currency',
        currency: 'CRC',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return formatter.format(number);
}


export default function ProjectDashboard({ status, name, description, progressValue, employees, tasks, budget, expenses }) {
        
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
        <>
            <div className={style.titleContainer}>
                <h1 className={style.title}>
                    {name}
                </h1>
                <div className={style.optionsProject}>
                    <Status status={status} />
                </div>
            </div>
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

            </div>
            <div className={style.tasksContainer}>
                <div className={style.taskHeader}>
                    <h3>Tareas</h3>
                    <Link href="/tareas/crear">+</Link>
                </div>
                <div className={style.tasks}>
                    <Task 
                        idTask={1}
                        name="Instalar cableado eléctrico en nueva oficina" 
                        status="En progreso" 
                        deadline="2024-08-20" 
                        assignee="https://i.pravatar.cc/150?u=a042581f4e29026001d" 
                        />
                    <Task 
                        idTask={2}
                        name="Revisar sistema de iluminación en bodega" 
                        status="Pendiente" 
                        deadline="2024-08-22" 
                        assignee="https://i.pravatar.cc/150?u=a042581f4e29026002d" 
                        />
                    <Task 
                        idTask={3}
                        name="Instalar paneles solares en edificio comercial" 
                        status="En espera" 
                        deadline="2024-08-25" 
                        assignee="https://i.pravatar.cc/150?u=a042581f4e29026003d" 
                        />
                    <Task 
                        idTask={4}
                        name="Configurar sistema de seguridad eléctrica" 
                        status="En progreso" 
                        deadline="2024-08-28" 
                        assignee="https://i.pravatar.cc/150?u=a042581f4e29026004d" 
                        />
                    <Task 
                        idTask={5}
                        name="Mantenimiento a generador de emergencia" 
                        status="Completado" 
                        deadline="2024-08-18" 
                        assignee="https://i.pravatar.cc/150?u=a042581f4e29026005d" 
                        />
                    <Task 
                        idTask={6}
                        name="Inspección de cableado estructurado" 
                        status="Pendiente" 
                        deadline="2024-08-30" 
                        assignee="https://i.pravatar.cc/150?u=a042581f4e29026006d" 
                        />
                    <Task 
                        idTask={7}
                        name="Instalar sistemas de ahorro energético" 
                        status="En progreso" 
                        deadline="2024-08-29" 
                        assignee="https://i.pravatar.cc/150?u=a042581f4e29026007d" 
                        />
                    <Task 
                        idTask={8}
                        name="Evaluar carga eléctrica en centro de datos" 
                        status="En espera" 
                        deadline="2024-08-27" 
                        assignee="https://i.pravatar.cc/150?u=a042581f4e29026008d" 
                    />
                </div>
            </div>
            <div className={style.projectFiles}>
                </div>
                <div className={style.tasksContainer}>
                    <h3>Tareas</h3>
                    <div className={style.tasks}>
                        <Task
                            name="Instalar cableado eléctrico en nueva oficina"
                            status="En progreso"
                            deadline="2024-08-20"
                            assignee="https://i.pravatar.cc/150?u=a042581f4e29026001d"
                        />
                        <Task
                            name="Revisar sistema de iluminación en bodega"
                            status="Pendiente"
                            deadline="2024-08-22"
                            assignee="https://i.pravatar.cc/150?u=a042581f4e29026002d"
                        />
                        <Task
                            name="Instalar paneles solares en edificio comercial"
                            status="En espera"
                            deadline="2024-08-25"
                            assignee="https://i.pravatar.cc/150?u=a042581f4e29026003d"
                        />
                        <Task
                            name="Configurar sistema de seguridad eléctrica"
                            status="En progreso"
                            deadline="2024-08-28"
                            assignee="https://i.pravatar.cc/150?u=a042581f4e29026004d"
                        />
                        <Task
                            name="Mantenimiento a generador de emergencia"
                            status="Completado"
                            deadline="2024-08-18"
                            assignee="https://i.pravatar.cc/150?u=a042581f4e29026005d"
                        />
                        <Task
                            name="Inspección de cableado estructurado"
                            status="Pendiente"
                            deadline="2024-08-30"
                            assignee="https://i.pravatar.cc/150?u=a042581f4e29026006d"
                        />
                        <Task
                            name="Instalar sistemas de ahorro energético"
                            status="En progreso"
                            deadline="2024-08-29"
                            assignee="https://i.pravatar.cc/150?u=a042581f4e29026007d"
                        />
                        <Task
                            name="Evaluar carga eléctrica en centro de datos"
                            status="En espera"
                            deadline="2024-08-27"
                            assignee="https://i.pravatar.cc/150?u=a042581f4e29026008d"
                        />
                    </div>
                </div>
                <div className={style.projectFiles}>

                </div>

            <div className={style.employeesContainer}>
                <div className={style.employeeHeader}>
                        <h3>Empleados Asignados</h3>
                        <Link href="/empleados/crear">+</Link>
                </div>
                <div className={style.employees}>
                    <Task 
                        name="Instalar cableado eléctrico en nueva oficina"  
                    />
                    <Task 
                        name="Revisar sistema de iluminación en bodega" 
                    />
                    <Task 
                        name="Instalar paneles solares en edificio comercial" 
                    />
                </div>
            </div>
        </div>
                <div className={style.employeesContainer}>
                    <h3>Empleados</h3>
                    <div className={style.employees}>
                        <Task
                            name="Instalar cableado eléctrico en nueva oficina"
                        />
                        <Task
                            name="Revisar sistema de iluminación en bodega"
                        />
                        <Task
                            name="Instalar paneles solares en edificio comercial"
                        />
                    </div>

                </div>
            </div>
        </>
    )
}