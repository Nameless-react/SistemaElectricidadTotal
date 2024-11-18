"use server";
import { revalidateTag } from "next/cache";
import config from "/config/config";

export const createTaskAction = async (task) => {
    try {
        const response = await fetch(`http://${config.host}:3000/api/tasks/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...task,
                employees: [...task.employees]
            })
        })


        if (result.error) return {errors: result.error}
        
        const result = await response.json();
    } catch (e) {
        return { errors: e }
    }
    revalidateTag("project")
    return { successMessage: "Tarea creada con éxito", data: {} }
}

export const updateTaskAction = async (task) => {
    try {
        const response = await fetch(`http://${config.host}:3000/api/tasks/${task.idTasks}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...task,
                employees: [...task.employees]
            })
        })
        
        
        const result = await response.json();
        // revalidatePath(`/proyectos/${task.idProjects}`)
        if (result.error) return {errors: result.error}
        
    } catch (e) {
        return { errors: e }
    }
    revalidateTag("project")
    return { successMessage: "Tarea se actualizó con éxito", data: {} }
}

export const deleteTaskAction = async (idTask) => {
    try {
        
        const response = await fetch(`http://${config.host}:3000/api/tasks/${idTask}`, {
            method: "DELETE"
        });
        const result = await response.json();
        
        if (result.error) return {errors: result.error}
        
    } catch (e) {
        return { errors: e }
    }
    revalidateTag("project")
    return { successMessage: "Tarea eliminada con éxito", data: {} }
}