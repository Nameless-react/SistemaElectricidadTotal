"use client"
import styles from "/css/messages.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUp } from "@fortawesome/free-solid-svg-icons"; 
import { useState } from "react";

export default function SendMessage({ idUserAuthor, idConversation, email, name }) {
    const [inputMessage, setInputMessage] = useState("");

    const handleChange = (e) => setInputMessage(e.target.value)

    const handleSendMessage = async (e) => {
        e.preventDefault();
        
        const data = await fetch('/api/chat/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: inputMessage, idUserAuthor, idConversation, email, name })
        })
        setInputMessage("")
    }

    return (
        <div className={styles.wrapperSendMessages}>
            <form onSubmit={handleSendMessage} className={styles.containerSendMessages}>
                <input type="text" placeholder="Escriba un mensaje" value={inputMessage} onChange={handleChange}/>
                <button><FontAwesomeIcon icon={faCircleUp} /></button>
            </form>
        </div>
    )
}