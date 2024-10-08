import { createContext, useContext, useState, useEffec } from "react";
import { handleChange, hand } from "../../../../../functions/handles/formHandles";
import { handleSubmit } from "../../../../../functions/handles/signUpHandles";
const SignUpFormContext = createContext();

export const useSignUpForm = () => useContext(SignUpFormContext);

export const SignUpFormProvider = ({ children }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [serverErrors, setServerErrors] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <SignUpFormContext.Provider value={{
            formData,
            setFormData,
            errors,
            setErrors,
            serverErrors,
            setServerErrors,
            handleChange,
            toggleVisibility,
            isVisible,
            handleSubmit
        }}>
            {children}
        </SignUpFormContext.Provider>
    )
}