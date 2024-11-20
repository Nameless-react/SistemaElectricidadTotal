"use server";
import { deleteHandler, getAllHandler, getHandler, patchHandler, postHandler } from "../../handles/handleFetch";
import { revalidatePath } from "next/cache";

export const getProjectsAction = async () => getAllHandler("projects/")

export const getMyProjectsAction = async (id) => getHandler("projects/my-projects/", id);


export const getProjectAction = async (id) => {
    const result = getHandler("projects/", id, {}, { next: { tags: ["project"] } });
    // Delay to see the skeleton
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    return result;
}

export const deleteProjectAction = async (id) => deleteHandler("projects/", id);


export const saveProjectAction = async (project) => {
    const result = postHandler("projects/", project);

    revalidatePath("/proyectos")
    return { successMessage: "Proyecto creado con éxito", data: {} }
    
}

export const updateProjectAction = async (project) => {
    const result = patchHandler("projects/", project.idProjects, project);
    return { successMessage: "Proyecto editado con éxito", data: {} }
}