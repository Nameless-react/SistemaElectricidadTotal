"use server"
import { getHandler, patchHandler, postHandler } from "../../handles/handleFetch";


export const getNotificationsByUserAction = async (id) => getHandler("notify/user/", id)

export const saveNotificationAction = async (notification) => postHandler("notify", notification)

export const markAsReadAction = async (id) => patchHandler("notify/", id)