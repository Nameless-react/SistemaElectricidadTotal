import Task from "./Task";
import style from "/css/projectDashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faCashRegister, faWallet } from "@fortawesome/free-solid-svg-icons";


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

            <div className={style.employees}>

            </div>
        </div>
    )
}