"use server"
import { revalidateTag, revalidatePath } from "next/cache";
import config from "/config/config";

export const getTeamsProjectAction = async () => {
    const response = await fetch(`http://${config.host}:3000/api/teams`);
    const result = await response.json();
    return result;
}

export const addTeamWithEmployeesAction = async (team) => {
    try {
        console.log(team)
        const response = await fetch(`http://${config.host}:3000/api/teams/`, {
            method: "POST",
            body: JSON.stringify({
                ...team,
                employees: [...team.employees]
            })
        });
        const result = await response.json();
    
        // revalidatePath(`/proyectos/${task.idProjects}`)
        if (result.error) return {errors: result.error}
    
        return { successMessage: "El equipo se creó con éxito", data: {} }
    } catch (e) {
        return { errors: e }
    }
}


export const deleteTeamProjectEmployeeAction = async (id) => {
    try {
        
        const response = await fetch(`http://${config.host}:3000/api/teams/employees/${id}`, {
            method: "DELETE"
        });
        const result = await response.json();

        // revalidatePath(`/proyectos/${task.idProjects}`)
        if (result.error) return {errors: result.error}

        return { successMessage: "El empleado ha sido eliminado del equipo con éxito", data: {} }
    } catch (e) {
        return { errors: e }
    }
}

export const changeTeamProjectEmployeeAction = async (teamEmployees) => {
    try {
        
        const response = await fetch(`http://${config.host}:3000/api/teams/employees/${teamEmployees.idTeamProject}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                employees: [...teamEmployees.employees]
            })
        });
        const result = await response.json();

        if (result.error) return {errors: result.error}
        
    } catch (e) {
        return { errors: e }
    }
    revalidateTag("project");
    return { successMessage: "Se ha actualizado la lista de empleados del equipo con éxito", data: {} }
}