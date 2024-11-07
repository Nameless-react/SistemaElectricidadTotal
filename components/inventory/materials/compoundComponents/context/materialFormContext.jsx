import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleSubmit } from "../../../../../functions/handles/materialsHandles";
import { handleChange, handleDropdownChange } from "../../../../../functions/handles/formHandles";
const MaterialFormContext = createContext();

export const useMaterialForm = () => useContext(MaterialFormContext);

/**
 * Provides context for managing a material form, including form data, errors, and handlers.
 * 
 * This context provider supplies the following values:
 * - id: The ID of the material, derived from the search parameters.
 * - router: The Next.js router instance for navigation.
 * - providers: An array of provider objects for the material.
 * - categories: An array of category objects for the material.
 * - formData: The form data for the material, stored as an object.
 * - errors: An array of form validation errors.
 * - serverError: An array of server-side errors.
 * - setFormData: Function to update the formData state.
 * - setErrors: Function to update the errors state.
 * - setServerError: Function to update the serverError state.
 * - handleChange: Function to handle changes in form input fields.
 * - handleDropdownChange: Function to handle changes in dropdown inputs.
 * - handleSubmit: Function to handle form submission.
 * 
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children components to be wrapped by the provider.
 * @param {Array} props.providers - An array of providers to be included in the context.
 * @param {Array} props.categories - An array of categories to be included in the context.
 * @param {Object} props.material - The material object containing details to be used in the form.
 */
export const MaterialFormProvider = ({ children, providers, categories, material }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState([]);
    const [serverError, setServerError] = useState([]);

    useEffect(() => {
        if (id) {
            setFormData(material);
        }
    }, [id]);

    return (
        <MaterialFormContext.Provider value={{
            id,
            router,
            providers,
            categories,
            formData,
            errors,
            serverError,
            setFormData,
            setErrors,
            setServerError,
            handleChange,
            handleDropdownChange,
            handleSubmit
        }}>
            {children}
        </MaterialFormContext.Provider>
    )
}