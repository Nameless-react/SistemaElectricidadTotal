"use server";
import { deleteHandler, patchHandler, postHandler } from "../../handles/handleFetch";
import { revalidateTag } from "next/cache";

export const createTaskAction = async (task) => {
    const result = postHandler("tasks/", {
        ...task,
        employees: [...task.employees]
    })
    
    revalidateTag("project")
    return { successMessage: "Tarea creada con éxito", data: {} }
}

export const updateTaskAction = async (task) => {
    const result = patchHandler("tasks/", task.idTasks, {
        ...task,
        employees: [...task.employees]
    })

    revalidateTag("project")
    return { successMessage: "Tarea se actualizó con éxito", data: {} }
}

export const deleteTaskAction = async (idTask) => {
    const result = deleteHandler("tasks/", idTask)
   
    revalidateTag("project")
    return { successMessage: "Tarea eliminada con éxito", data: {} }
}