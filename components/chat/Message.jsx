import styles from "/css/messages.module.css";
import Image from "next/image";
import { format } from "@formkit/tempo";

export default function Message({ message, author, image, authorEmail, sendAt, emailCurrentUser }) {
    const isCurrentUser = emailCurrentUser === authorEmail;
    const date = format(sendAt, "DD/MM/YYYY HH:mm");

    return (
        <div className={isCurrentUser ? styles.messageContainerActualUser : styles.messageContainer }>
            <div className={isCurrentUser ? styles.messageInfoActualUser : styles.messageInfo}>
                {!isCurrentUser && 
                <>
                    <Image width={200} height={200} src={image} alt="image" />
                    <p>{author}</p>
                </>}
                <p>{date}</p>
            </div>
            
            <div className={styles.message}>
                <p>{message}</p>
            </div>
        </div>
    )
}