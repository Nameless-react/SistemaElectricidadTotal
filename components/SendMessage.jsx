import styles from "/css/sendMessage.module.css";

export default function SendMessage() {
    return (
        <div className={styles.containerSendMessages}>
            <input type="text" placeholder="Escriba un mensaje" />
        </div>
    )
}