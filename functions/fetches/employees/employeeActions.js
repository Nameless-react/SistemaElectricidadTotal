"use server";
import config from "/config/config";

export const getEmployeesAction = async () => {
    const response = await fetch(`http://${config.host}:3000/api/employees`);
    const result = await response.json();
    return result;
}