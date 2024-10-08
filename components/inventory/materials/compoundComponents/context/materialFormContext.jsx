import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleSubmit } from "../../../../../functions/handles/materialsHandles";
import { handleChange, handleDropdownChange } from "../../../../../functions/handles/formHandles";
const MaterialFormContext = createContext();

export const useMaterialForm = () => useContext(MaterialFormContext);

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