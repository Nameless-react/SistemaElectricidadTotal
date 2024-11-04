"use server";
import config from "/config/config";

export const getChatAction = async (id) => {
    const response = await fetch(`http://${config.host}:3000/api/chat/messages/${id}`);
    const result = await response.json();
    return result;
}