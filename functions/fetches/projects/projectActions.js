"use server";
import { revalidatePath } from "next/cache";
import config from "/config/config";

export const getProjectsAction = async () => {
    const response = await fetch(`http://${config.host}:3000/api/projects`);
    const result = await response.json();
    return result;
}

export const getMyProjectsAction = async (id) => {
    const response = await fetch(`http://${config.host}:3000/api/projects/my-projects/${id}`);
    const result = await response.json();
    return result;
}

export const getProjectAction = async (id) => {
    const response = await fetch(`http://${config.host}:3000/api/projects/${id}`, { next: { tags: ["project"] } });
    const result = await response.json();
    // Delay to see the skeleton
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    return result;
}

export const deleteProjectAction = async (id) => {
    const response = await fetch(`http://${config.host}:3000/api/projects/${id}`, {
        method: "DELETE"
    });
    const result = await response.json();
    return result;
}

export const saveProjectAction = async (project) => {
    console.log(project)
    try {
        const response = await fetch(`http://${config.host}:3000/api/projects/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })

        const result = await response.json();
        if (result.error) return {errors: result.error}
        
    } catch (e) {
        return { errors: e }
    }
    revalidatePath("/proyectos")
    return { successMessage: "Proyecto creado con éxito", data: {} }
    
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

    } catch (e) {
        return { errors: e }
    }
    return { successMessage: "Proyecto editado con éxito", data: {} }
}