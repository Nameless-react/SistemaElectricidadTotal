"use server";
import config from "/config/config";

export const getEmployeesAction = async (id) => {
    const response = await fetch(`http://${config.host}:3000/api/employees/${id}`);
    const result = await response.json();
    return result;
}

export const deleteEmployeeAction = async (id) => {
    try {
        
        const response = await fetch(`http://${config.host}:3000/api/employees/${id}`, {
            method: "DELETE"
        });
        const result = await response.json();
        if (result.error) return {errors: result.error}

        return { successMessage: "El empleado ha sido eliminado con éxito", data: {} }
    } catch (e) {
        return { errors: e }
    }
}