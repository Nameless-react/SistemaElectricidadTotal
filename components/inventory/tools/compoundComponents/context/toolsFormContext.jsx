import { createContext, useContext, useEffect } from "react";
import { handleSubmit } from "../../../../../functions/handles/toolsHandles";
import { handleChange, handleDropdownChange, handleImageChange, handleImageRemove, } from "../../../../../functions/handles/formHandles";
import React from "react";
import { fetchTool } from "../../../../../functions/fetches/tools/toolsFetches";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
const ToolsFormContext = createContext();

export const useToolsForm = () => useContext(ToolsFormContext);

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