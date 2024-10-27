"use client"
import { createContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const [messagesConversation, setMessagesConversation] = useState([]);
    const [conversations, setConversations] = useState([]);
    const { data: session, status } = useSession();
  


    return (
        <ProjectContext.Provider value={{ selectedConversationId, setSelectedConversationId, messagesConversation, setMessagesConversation, conversations }}>
            {children}
        </ProjectContext.Provider>
    );
};