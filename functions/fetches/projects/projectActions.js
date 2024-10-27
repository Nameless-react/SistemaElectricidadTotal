"use server";
import config from "/config/config";

export const getProjectsAction = async () => {
    const response = await fetch(`http://${config.host}:3000/api/projects`);
    const result = await response.json();
    return result;
}

export const getProjectAction = async (id) => {
    const response = await fetch(`http://${config.host}:3000/api/projects/${id}`);
    const result = await response.json();
    return result;
}

export const deleteProjectAction = async (id) => {
    const response = await fetch(`http://${config.host}:3000/api/projects/${id}`, {
        method: "DELETE"
    });
    const result = await response.json();
    return result;
}