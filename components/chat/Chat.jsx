"use client"
import styles from "/css/messages.module.css";
import Image from "next/image";

export default function Chat({ name, lastMessage, lastMessageSend, image, authorMessage, isSelected, onClick }) {
        return (
            <div onClick={onClick} className={styles.chat} style={{ background: isSelected ? "#3a414e" : "transparent" }}>
                <Image width={150} height={150} src={image ? image : "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"} alt="image"/>
                <div>
                    <div className={styles.chatInfo}>
                        <h3>{name}</h3>
                        <p>{lastMessageSend}</p>
                    </div>
                    <p>{authorMessage}: {lastMessage}</p>
                </div>
            </div>
        )
}