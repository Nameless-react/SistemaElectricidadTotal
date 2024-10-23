"use client"
import Chat from "/components/chat/Chat";
import styles from "/css/messages.module.css";

export default function ChatList({ conversations, setSelectedConversationId, selectedConversationId }) {
    // console.log(setSelectedConversationId)
    // console.log(selectedConversationId)
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