"use client"
import Conversation from "/components/chat/Conversation";
import { ChatProvider } from "/components/chat/context/ChatContext";


export default function ChatPage() {
    return (
        <ChatProvider>
            <Conversation />
        </ChatProvider>
    )
}