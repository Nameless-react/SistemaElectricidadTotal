"use server";
import config from "/config/config";

export const getProjectsAction = async () => {
    const response = await fetch(`http://${config.host}:3000/api/projects`);
    const result = await response.json();
    return result;
}
