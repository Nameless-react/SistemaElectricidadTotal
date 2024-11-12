"use server";
import config from "/config/config";

export const getLogsAction = async () => {
    const response = await fetch(`http://${config.host}:3000/api/log`);
    const result = await response.json();
    return result;
}

export const logsAction = async (id) => {
    const response = await fetch(`http://${config.host}:3000/api/log/${id}`);
    const result = await response.json();
    return result;
}


