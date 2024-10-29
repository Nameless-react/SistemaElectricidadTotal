"use server";
import { revalidatePath } from "next/cache";
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


        const result = await response.json();
        // revalidatePath(`/proyectos/${task.idProjects}`)
        if (result.error) return {errors: result.error}

        return { successMessage: "Tarea creada con éxito", data: {} }
    } catch (e) {
        return { errors: e }
    }
}

export const deleteTaskAction = async (idTask) => {
    try {
        
        const response = await fetch(`http://${config.host}:3000/api/tasks/${idTask}`, {
            method: "DELETE"
        });
        const result = await response.json();

        if (result.error) return {errors: result.error}
        
        return { successMessage: "Tarea eliminada con éxito", data: {} }
    } catch (e) {
        return { errors: e }
    }
}