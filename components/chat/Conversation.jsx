"use client"
import { useEffect, useState } from "react";
import ChatList from "./ChatList";
import ChatMessages from "./ChatMessages";
import styles from "/css/messages.module.css";
import { getChatAction } from "/functions/fetches/chats/chatActions";


export default function Conversation({ conversations, messages, idConversation }) {
    const [selectedConversationId, setSelectedConversationId] = useState(idConversation);
    const [messagesConversation, setMessagesConversation] = useState(messages);
    useEffect(() => {
        const fetchMessages = async () => {
            const newMessages = await getChatAction(selectedConversationId);
            setMessagesConversation(newMessages);
        } 
        
        fetchMessages();
        console.log(selectedConversationId)
        console.log(messagesConversation)
    }, [selectedConversationId])

    return (
        <div className={styles.chats}>
            <ChatList conversations={conversations} setSelectedConversationId={setSelectedConversationId} selectedConversationId={selectedConversationId} />
            <ChatMessages messagesConversation={messagesConversation} setMessagesConversation={setMessagesConversation} idConversation={selectedConversationId} />
        </div>
    )
}