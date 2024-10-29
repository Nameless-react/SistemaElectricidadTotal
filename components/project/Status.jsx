import { faPause, faPlay, faClock, faCheckCircle, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "/css/projects.module.css";

const STATUS_DETAILS = {
    'En progreso': { className: 'inProgress', icon: faPlay },
    'Pendiente': { className: 'pending', icon: faClock },
    'En espera': { className: 'onHold', icon: faPause },
    'Completado': { className: 'completed', icon: faCheckCircle },
};

const DEFAULT_STATUS = { className: '', icon: faQuestionCircle };

export default function Status({ status, size }) {
    const { className, icon } = STATUS_DETAILS[status] || DEFAULT_STATUS;
    
    const containerStyle = {
        width: size === "s" ? "2%" : "35%",
        fontSize: size === "s" ? ".7rem" : ".8rem",
        padding: size === "s" ? ".3rem 0" : ".5rem 0"
    };

    return (
        <div className={`${styles.status} ${styles[className]}`} style={containerStyle}>
            <FontAwesomeIcon className="text-2xl" icon={icon} />
            <p>{status}</p>
        </div>
    );
}
