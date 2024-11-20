import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect } from "react";
import { handleChange, handleDropdownChange } from "../../../../../functions/handles/formHandles";
import { handleSubmit } from "../../../../../functions/handles/formHandles";
import { validateProjectExpenseForm } from "../../../../../functions/validations/projectExpensesValidation";
import React from "react";

const ExpensesFormContext = createContext();
export const useExpensesForm = () => useContext(ExpensesFormContext);

/**
 * Provides context for managing an expense form, including form data, errors, and handlers.
 *
 * This context provider supplies the following values:
 * - id: The ID of the expense, derived from the search parameters.
 * - router: The Next.js router instance for navigation.
 * - projects: An array of project objects for selecting the associated project.
 * - categories: An array of category objects for selecting the expense category.
 * - formData: The form data for the expense, stored as an object.
 * - errors: An array of form validation errors.
 * - serverError: An array of server-side errors.
 * - setErrors: Function to update the errors state.
 * - setServerError: Function to update the serverError state.
 * - setFormData: Function to update the formData state.
 * - handleChange: Function to handle changes in form input fields.
 * - handleDropdownChange: Function to handle changes in dropdown inputs.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children components to be wrapped by the provider.
 * @param {Array} props.projects - An array of projects to be included in the context.
 * @param {Array} props.categories - An array of categories to be included in the context.
 * @param {Object} props.expense - The expense object containing details to be used in the form.
 */
export const ExpensesFormProvider = ({ children, projects, categories, expense }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [formData, setFormData] = React.useState({
        description: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        project: "",
        user: "",
        status: "Seleccionar Status",
        category: ""
    });
    const [errors, setErrors] = React.useState([]);
    const [serverErrors, setServerErrors] = React.useState([]);
    const [selectedProject, setSelectedProject] =  React.useState(new Set([""]));
    const [selectedUser, setSelectedUser] = React.useState(new Set());
    const [selectedStatus, setSelectedStatus] = React.useState(new Set(["Seleccionar Status"]));
    const [selectedCategory, setSelectedCategory] = React.useState(new Set());
    const [users, setUsers] = React.useState([]);
    
    useEffect(() => {
        if (id) {
            setFormData(expense);
        }
    }, [id]);

    return (
        <ExpensesFormContext.Provider value={{
            id,
            router,
            projects,
            selectedProject,
            categories,
            formData,
            errors,
            serverErrors,
            users,
            selectedUser,
            selectedCategory,
            selectedStatus,
            setSelectedStatus,
            setSelectedUser,
            setSelectedCategory,
            setUsers,
            setSelectedProject,
            setErrors,
            setServerErrors,
            setFormData,
            handleChange,
            handleDropdownChange,
            handleSubmit,
            validateProjectExpenseForm
        }}>
            {children}
        </ExpensesFormContext.Provider>
    );
};
