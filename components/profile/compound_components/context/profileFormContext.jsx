
import { createContext, useContext, useEffect, useState } from "react";
import { handleChange } from "../../../../functions/handles/formHandles";
import { handleSubmit } from "../../../../functions/handles/profileHandles";
const ProfileFormContext = createContext();

export const useProfileForm = () => useContext(ProfileFormContext);

/**
 * Provides context for managing a profile form, including form data, errors, and handlers.
 * 
 * This context provider supplies the following values:
 * - formData: The form data for the profile, stored as an object.
 * - setFormData: Function to update the formData state.
 * - errors: An array of form validation errors.
 * - setErrors: Function to update the errors state.
 * - serverErrors: An array of server-side errors.
 * - setServerErrors: Function to update the serverErrors state.
 * - handleChange: Function to handle changes in form input fields.
 * - handleSubmit: Function to handle form submission.
 * 
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children components to be wrapped by the provider.
 * @param {Object} props.user - The user object containing details to be used in the form.
 */
export const ProfileFormProvider = ({ children, user }) => {

    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [serverErrors, setServerErrors] = useState({});

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    return (
        <ProfileFormContext.Provider value={{
            formData,
            setFormData,
            errors,
            setErrors,
            serverErrors,
            setServerErrors,
            handleChange,
            handleSubmit
        }}>
            {children}
        </ProfileFormContext.Provider>
    )

}   