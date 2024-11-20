import { createContext, useContext, useEffect } from "react";
import { handleSubmit } from "../../../../../functions/handles/toolsHandles";
import { handleChange, handleDropdownChange, handleImageChange, handleImageRemove, } from "../../../../../functions/handles/formHandles";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
const ToolsFormContext = createContext();

export const useToolsForm = () => useContext(ToolsFormContext);

/**
 * Provides context for managing a tool form, including form data, errors, and handlers.
 * 
 * This context provider supplies the following values:
 * - id: The ID of the tool, derived from the search parameters.
 * - router: The Next.js router instance for navigation.
 * - providers: An array of provider objects for the tool.
 * - categories: An array of category objects for the tool.
 * - formData: The form data for the tool, stored as an object.
 * - imagePreview: A preview image for the tool, if one is set.
 * - errors: An array of form validation errors.
 * - serverError: An array of server-side errors.
 * - isChecked: A boolean indicating whether the maintenance notes checkbox is checked.
 * - setIsChecked: Function to update the isChecked state.
 * - setErrors: Function to update the errors state.
 * - setServerError: Function to update the serverError state.
 * - setImagePreview: Function to update the imagePreview state.
 * - setFormData: Function to update the formData state.
 * - handleChange: Function to handle changes in form input fields.
 * - handleDropdownChange: Function to handle changes in dropdown inputs.
 * - handleImageChange: Function to handle changes in image inputs.
 * - handleImageRemove: Function to handle the removal of an image.
 * - handleSubmit: Function to handle form submission.
 * 
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children components to be wrapped by the provider.
 * @param {Array} props.providers - An array of providers to be included in the context.
 * @param {Array} props.categories - An array of categories to be included in the context.
 * @param {Object} props.tool - The tool object containing details to be used in the form.
 */
export const ToolFormProvider = ({ children, providers, categories, tool }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [formData, setFormData] = React.useState({});
    const [imagePreview, setImagePreview] = React.useState(null);
    const [errors, setErrors] = React.useState([]);
    const [serverError, setServerError] = React.useState([]);
    const [isChecked, setIsChecked] = React.useState(false);

    useEffect(() => {
        if (id) {
            setFormData(tool);
            setImagePreview(tool.image);
        }
    }, [id]);

    return (
        <ToolsFormContext.Provider value={
            {
                id,
                router,
                providers,
                categories,
                formData,
                imagePreview,
                errors,
                serverError,
                isChecked,
                setIsChecked,
                setErrors,
                setServerError,
                setImagePreview,
                setFormData,
                handleChange,
                handleImageChange,
                handleDropdownChange,
                handleImageRemove,
                handleSubmit
            }}>
            {children}
        </ToolsFormContext.Provider>
    );
}