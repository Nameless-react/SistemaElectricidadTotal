import styles from "/css/messages.module.css";
import Image from "next/image";


export default function Message({ message, author, actualUser, image }) {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    const today = `${dd}/${mm}/${yyyy}`;

    return (
        <div className={styles.messageContainer}>
            <div className={styles.messageInfo}>
                <Image width={200} height={200} src={image} alt="image" />
                <p>{author}</p>
                <p>{today} {time}</p>
            </div>
            
            <div className={styles.message}>
                <p>{message}</p>
            </div>
        </div>

    )
}