
import { createContext, useContext, useEffect, useState } from "react";
import { handleChange } from "../../../../functions/handles/formHandles";
import { handleSubmit } from "../../../../functions/handles/profileHandles";
const ProfileFormContext = createContext();

export const useProfileForm = () => useContext(ProfileFormContext);

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