"use client"
import styles from "/css/messages.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react"
import { format } from "@formkit/tempo";

export default function Message({ message, author, actualUser, image, authorEmail }) {
    const { data: session } = useSession();
    console.log(session?.user?.email)
    console.log(authorEmail)
    const isCurrentUser = session?.user?.email === authorEmail;
    const today = format(new Date(), "DD/MM/YYYY HH:mm");

    return (
        <div className={isCurrentUser ? styles.messageContainerActualUser : styles.messageContainer }>
            <div className={isCurrentUser ? styles.messageInfoActualUser : styles.messageInfo}>
                {!isCurrentUser && 
                <>
                    <Image width={200} height={200} src={image} alt="image" />
                    <p>{author}</p>
                </>}
                <p>{today}</p>
            </div>
            
            <div className={styles.message}>
                <p>{message}</p>
            </div>
        </div>

    )
}