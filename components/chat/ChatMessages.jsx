"use client";
import { useContext, useEffect, useRef } from "react";
import Message from "/components/chat/Message";
import styles from "/css/messages.module.css";
import pusherClient from "/functions/others/pusher/pusherClient";
import SendMessage from "./SendMessage";
import { useSession } from "next-auth/react"
import { ChatContext } from "./context/ChatContext";



export default function ChatMessages() {
    const { messagesConversation, setMessagesConversation, selectedConversationId } = useContext(ChatContext);
    const { data: session } = useSession();
    const messagesEndRef = useRef(null);


    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });


    useEffect(() => {
        if (!selectedConversationId) return;
        

        const channel = pusherClient
            .subscribe(selectedConversationId.toString())
            .bind("message::new", (data) => {
                setMessagesConversation(prevValues => [...prevValues, data])
            });

        return () => channel.unbind();
    }, [selectedConversationId])

    useEffect(() => {
        scrollToBottom();
    }, [messagesConversation]);


    const componentsMessages = Array.isArray(messagesConversation) || messagesConversation.length === 0 ? messagesConversation.map((message, index) => (
        <Message
            key={index}
            sendAt={message.sendAt}
            message={message.message}
            authorEmail={message?.User?.email}
            emailCurrentUser={session?.user?.email}
            author={message?.User?.name}
            image={message?.User?.image || "https://s2.abcstatics.com/media/bienestar/2022/06/01/jesus-matos-2-kQVC--1248x698@abc.png"}
        />
    )) : <p className={styles.noMessages}>No hay mensajes disponibles</p>;

    return (
        <>
        {console.log(session)}
            {session && (
                <div className={styles.messagesContainer}>
                    {componentsMessages}
                    <div ref={messagesEndRef} />
                    <SendMessage
                        idUserAuthor={session.user.id}
                        idConversation={selectedConversationId}
                        name={session.user.name}
                        email={session.user.email}
                        image={session.user.image}
                    />
                </div>
            )}
        </>
    )
}