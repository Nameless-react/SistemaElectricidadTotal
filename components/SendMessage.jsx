import styles from "/css/messages.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUp } from "@fortawesome/free-solid-svg-icons"; 

export default function SendMessage() {
    return (
        <div className={styles.wrapperSendMessages}>
            <div className={styles.containerSendMessages}>
                <input type="text" placeholder="Escriba un mensaje" />
                <button><FontAwesomeIcon icon={faCircleUp} /></button>
            </div>
        </div>
    )
}