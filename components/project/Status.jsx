import { faPause, faPlay, faClock, faCheckCircle, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "/css/projects.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const statusDetails = {
    'En progreso': { class: 'inProgress', icon: faPlay },
    'Pendiente': { class: 'pending', icon: faClock },
    'En espera': { class: 'onHold', icon: faPause },
    'Completado': { class: 'completed', icon: faCheckCircle }
};

const defaultStatus = { class: '', icon: faQuestionCircle };



export default function Status({status}) {
    const { class: statusClass, icon: statusIcon } = statusDetails[status] || defaultStatus;

    return (
        <div className={`${styles.status} ${styles[statusClass]}`}>
            <FontAwesomeIcon className="text-2xl" icon={statusIcon} />
            <p>{status}</p>
        </div>
    )

}