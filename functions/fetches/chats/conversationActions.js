"use server";
import config from "/config/config";

export const getConversationsAction = async (id) => {
    const response = await fetch(`http://${config.host}:3000/api/chat/conversations/${id}`);
    const result = await response.json();
    return result;
}