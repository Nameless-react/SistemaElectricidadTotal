"use server"
import { getChatAction } from "/functions/fetches/chats/chatActions";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { getConversationsAction } from "/functions/fetches/chats/conversationActions"
import Conversation from "/components/chat/Conversation";


export default async function ChatPage() {
    const session = await getServerSession(options);
    const conversations = await getConversationsAction(session.user?.id)
    const idConversation = conversations.length > 0 ? conversations[0].idConversation : null
    const messages = await getChatAction(idConversation);
   
    return (
        <Conversation conversations={conversations} messages={messages} idConversation={idConversation} />
    )
}