import styles from "/css/messages.module.css";
import Image from "next/image";

export default function Chat({ user, lastMessage, time, image, authorMessage }) {
        return (
            <div className={styles.chat}>
                <Image width={200} height={200} src={image} alt="image"/>
                <div>
                    <div className={styles.chatInfo}>
                        <h3>{user}</h3>
                        <p>{time}</p>
                    </div>
                    <p>{authorMessage}: {lastMessage}</p>
                </div>
            </div>
        )
}