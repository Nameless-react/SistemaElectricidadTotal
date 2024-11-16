import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "/css/projects.module.css";
import { STATUS_DETAILS, DEFAULT_STATUS } from "/shared/status";


export default function Status({ status, size }) {
    const { className, icon } = STATUS_DETAILS[status] || DEFAULT_STATUS;
    
    const containerStyle = {
        width: size === "s" ? "2%" : "35%",
        fontSize: size === "s" ? ".7rem" : ".8rem",
        padding: size === "s" ? ".3rem 0" : ".5rem 0",
        iconSize: size === "s" ? "text-md" : "text-2xl"
    };

    return (
        <div className={`${styles.status} ${styles[className]}`} style={containerStyle}>
            <FontAwesomeIcon className={`${containerStyle.iconSize}`} icon={icon} />
            <p>{status}</p>
        </div>
    );
}
