"use client"
import { useContext } from "react";
import Chat from "/components/chat/Chat";
import styles from "/css/messages.module.css";
import { ChatContext } from "./context/ChatContext";

export default function ChatList() {
    const { conversations, setSelectedConversationId, selectedConversationId } = useContext(ChatContext);
    return (
        <div className={styles.conversationsContainer}>
            <h2>Chats</h2>
           
            {conversations.map((conversation) => (
                <Chat
                    key={conversation.idConversation}
                    name={conversation.conversationName}
                    lastMessageSend={conversation.lastMessageTime}
                    lastMessage={conversation.lastMessage}
                    authorMessage={conversation.authorMessage}
                    image={conversation.image}
                    onClick={() => setSelectedConversationId(conversation.idConversation)}
                    isSelected={conversation.idConversation === selectedConversationId} 
                />
            ))}            
        </div>
    );
}