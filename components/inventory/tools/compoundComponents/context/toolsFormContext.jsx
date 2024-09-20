import { createContext, useContext, useEffect } from "react";
import { handleChange, handleDropdownChange, handleImageChange, handleImageRemove, handleSubmitCreate } from "../../../../../functions/handles/toolsHandles"
import React from "react";
const ToolsFormContext = createContext();

export const useToolsForm = () => useContext(ToolsFormContext);

export const ToolFormProvider = ({ children, providers, categories }) => {

    const [formData, setFormData] = React.useState({});
    const [imagePreview, setImagePreview] = React.useState(null);
    const [errors, setErrors] = React.useState([]);
    const [serverError, setServerError] = React.useState(null);
    const [isChecked, setIsChecked] = React.useState(false);

    return (
        <ToolsFormContext.Provider value={
            {
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
                handleSubmitCreate
            }}>
            {children}
        </ToolsFormContext.Provider>
    );
}