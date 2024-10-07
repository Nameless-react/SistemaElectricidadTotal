import { createContext, useContext, useState } from "react";
import { handleChange } from "../../../../../functions/handles/formHandles";
import { handleSubmit } from "../../../../../functions/handles/signInHandles";
/**
 * Provider for the sign in form context.
*
* It provides the following values in the context:
* - formData: the form data as an object
* - setFormData: the function to update the formData
* - errors: the errors for the form as an object
* - setErrors: the function to update the errors
* - handleChange: the function to handle the form field changes
* - serverErrors: the errors returned by the server as an object
* - setServerErrors: the function to update the server errors
* - toggleVisibility: the function to toggle the visibility of the password
* - isVisible: a boolean indicating whether the password is visible or not
*
* It expects a children prop, which is the component to be wrapped with the context provider.
*
* @example
* import { SignInProvider } from "../../../../../components/auth/signIn/compound_components/context/signInContext";
* 
* const App = () => {
    *     return (
    *         <SignInProvider>
    *             <SignInForm />
    *         </SignInProvider>
    *     );
    * }
    */

const SignInContext = createContext();

export const useSignIn = () => useContext(SignInContext);

export const SignInProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [serverErrors, setServerErrors] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <SignInContext.Provider value={{
            formData,
            setFormData,
            errors,
            setErrors,
            handleChange,
            serverErrors,
            setServerErrors,
            toggleVisibility,
            isVisible,
            handleSubmit
        }
        } >
            {children}
        </SignInContext.Provider>
    )
}

