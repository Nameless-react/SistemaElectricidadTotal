
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { handleChange, handleDropdownChange } from "../../../../../functions/handles/formHandles";
import { handleSubmit } from "../../../../../functions/handles/expenseCategoryHandles";
const ExpensesCategoryFormContext = createContext();

export const useExpensesCategoryFormContext = () => useContext(ExpensesCategoryFormContext);


/**
 * ExpensesCategoryFormProvider component provides context for managing the state of an expense category form.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components that will be wrapped by this provider.
 * @param {Object} props.expenseCategory - The expense category data to initialize the form with.
 *
 * @returns {JSX.Element} The context provider component.
 *
 * @context {Object} ExpensesCategoryFormContext - The context object.
 * @context {string} ExpensesCategoryFormContext.id - The ID of the expense category.
 * @context {Object} ExpensesCategoryFormContext.router - The Next.js router object.
 * @context {Object} ExpensesCategoryFormContext.formData - The form data state.
 * @context {Array} ExpensesCategoryFormContext.errors - The client-side validation errors.
 * @context {Array} ExpensesCategoryFormContext.serverErrors - The server-side validation errors.
 * @context {Set} ExpensesCategoryFormContext.selectedStatus - The selected status of the expense category.
 * @context {Function} ExpensesCategoryFormContext.setSelectedStatus - Function to set the selected status.
 * @context {Function} ExpensesCategoryFormContext.handleChange - Function to handle form input changes.
 * @context {Function} ExpensesCategoryFormContext.handleDropdownChange - Function to handle dropdown changes.
 * @context {Function} ExpensesCategoryFormContext.setFormData - Function to set the form data.
 * @context {Function} ExpensesCategoryFormContext.setErrors - Function to set client-side validation errors.
 * @context {Function} ExpensesCategoryFormContext.setServerErrors - Function to set server-side validation errors.
 */
export const ExpensesCategoryFormProvider = ({ children, expenseCategory }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState([]);
    const [serverErrors, setServerErrors] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(new Set(["Seleccionar Status"]));

  
    /**
  * useEffect to set form data when an `id` is present.
  * It pre-fills the form with data from `expenseCategory` if the `id` is provided.
  */
    useEffect(() => {
        if (id) {
            setFormData(expenseCategory);
        }
    }, [id]);

    return (
        <ExpensesCategoryFormContext.Provider value={{
            id,
            router,
            formData,
            errors,
            serverErrors,
            selectedStatus,
            setSelectedStatus,
            handleChange,
            handleDropdownChange,
            setFormData,
            setErrors,
            setServerErrors,
            handleSubmit
        }}>
            {children}
        </ExpensesCategoryFormContext.Provider>
    );
}