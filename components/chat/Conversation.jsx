"use client"
import { useContext, useEffect, useState } from "react";
import ChatList from "./ChatList";
import ChatMessages from "./ChatMessages";
import styles from "/css/messages.module.css";
import { getChatAction } from "/functions/fetches/chats/chatActions";
import { ChatContext } from "./context/ChatContext";


export default function Conversation() {
    const { selectedConversationId, setMessagesConversation } = useContext(ChatContext);
    const [initialLoad, setInitialLoad] = useState(true);
    
    useEffect(() => {
        const fetchMessages = async () => {
            const newMessages = await getChatAction(selectedConversationId);
            setMessagesConversation(newMessages);
        } 
        
        if (!initialLoad) fetchMessages();
        else setInitialLoad(false);

    
    }, [selectedConversationId])

    return (
        <div className={styles.chats}>
            <ChatList />
            <ChatMessages />
        </div>
    )
}