"use client";
import { useEffect, useState, useRef } from "react";
import Message from "/components/chat/Message";
import styles from "/css/messages.module.css";
import pusherClient from "/functions/others/pusher/pusherClient";
import SendMessage from "./SendMessage";
import { useSession } from "next-auth/react"



export default function ChatMessages({ messagesConversation, setMessagesConversation, idConversation }) {
    const { data: session } = useSession();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    };

    
    useEffect(() => {
        const channel = pusherClient
        .subscribe(idConversation.toString())
        .bind("message::new", (data) => {
            setMessagesConversation(prevValues => [...prevValues, data])
        });
        
        return () => channel.unbind();
    }, [idConversation])
    
    useEffect(() => {
        scrollToBottom();
    }, [messagesConversation]);


    const componentsMessages = Array.isArray(messagesConversation) ? messagesConversation.map((message, index) => (
        <Message 
            key={index}
            sendAt={message.sendAt}
            message={message.message}
            authorEmail={message?.User?.email}
            emailCurrentUser={session?.user?.email}
            author={message?.user?.name}
            image={"https://s2.abcstatics.com/media/bienestar/2022/06/01/jesus-matos-2-kQVC--1248x698@abc.png"}
        />
    )) : <p>No hay mensajes disponibles</p>;

    return (
        <>
            <div className={styles.messagesContainer}>
                {componentsMessages}
                <div ref={messagesEndRef} />
            </div>
            {session && (
                <SendMessage
                    idUserAuthor={session.user.id}
                    idConversation={idConversation}
                    name={session.user.name}
                    email={session.user.email}
                />
            )}
        </>
    );
}