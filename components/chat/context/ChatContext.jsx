"use client"
import { createContext, useState, useEffect } from 'react';
import { getConversationsAction } from '/functions/fetches/chats/conversationActions';
import { getChatAction } from '/functions/fetches/chats/chatActions';
import { useSession } from 'next-auth/react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const [messagesConversation, setMessagesConversation] = useState([]);
    const [conversations, setConversations] = useState([]);
    const { data: session, status } = useSession();
  

    useEffect(() => {
        if (status !== 'authenticated' || !session) return;


        const fetchInitialData = async () => {
            const conversations = await getConversationsAction(session.user?.id)
            const idConversation = conversations.length > 0 ? conversations[0].idConversation : null
            const messages = idConversation ? await getChatAction(idConversation) : [];

            setConversations(conversations);
            setMessagesConversation(messages);
            setSelectedConversationId(idConversation);
        };

        fetchInitialData();
    }, [status]);

    return (
        <ChatContext.Provider value={{ selectedConversationId, setSelectedConversationId, messagesConversation, setMessagesConversation, conversations }}>
            {children}
        </ChatContext.Provider>
    );
};