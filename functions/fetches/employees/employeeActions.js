"use server";
import config from "/config/config";

export const getEmployeesAction = async () => {
    const response = await fetch(`http://${config.host}:3000/api/employees`);
    const result = await response.json();
    return result;
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

export const addTeamProjectEmployeeAction = async (teamProjectEmployees) => {
    try {
        const response = await fetch(`http://${config.host}:3000/api/teams/employees`, {
            method: "POST",
            body: JSON.stringify({
                ...teamProjectEmployees,
                employees: [...teamProjectEmployees.employees]
            })
        });
        const result = await response.json();

        // revalidatePath(`/proyectos/${task.idProjects}`)
        if (result.error) return {errors: result.error}

        return { successMessage: "El empleado ha sido agregado con éxito", data: {} }   
    } catch (e) {
        return { errors: e }
    }
}