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
    // Delay to see the skeleton
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    return result;
}

export const deleteProjectAction = async (id) => {
    const response = await fetch(`http://${config.host}:3000/api/projects/${id}`, {
        method: "DELETE"
    });
    const result = await response.json();
    return result;
}

export const saveProjectAction = async () => {
    const response = await fetch(`http://${config.host}:3000/api/projects/`, {
        method: "POST"
    })
}

export const updateProjectAction = async (project) => {
    try {
        const response = await fetch(`http://${config.host}:3000/api/projects/${project.idProjects}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        });


        const result = await response.json();
        if (result.error) return {errors: result.error}

        return { successMessage: "Proyecto editado con éxito", data: {} }
    } catch (e) {
        return { errors: e }
    }
}