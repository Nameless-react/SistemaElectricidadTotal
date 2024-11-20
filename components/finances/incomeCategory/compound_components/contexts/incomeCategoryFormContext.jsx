import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { handleChange, handleDropdownChange, handleSubmit } from "../../../../../functions/handles/formHandles";
import { validateIncomeCategoryForm } from "../../../../../functions/validations/incomeCategoryValidation";
const IncomeCategoryFormContext = createContext();

export const useIncomeCategoryForm = () => useContext(IncomeCategoryFormContext);

export const IncomeCategoryFormProvider = ({ children, incomeCategory }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState([]);
    const [serverErrors, setServerErrors] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(new Set(["Seleccionar Status"]));

    useEffect(() => {
        if (id) {
            setFormData(incomeCategory);
        }
    }, [id]);

    return (
        <IncomeCategoryFormContext.Provider value={{
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
            handleSubmit,
            validateIncomeCategoryForm
        }}>
            {children}
        </IncomeCategoryFormContext.Provider>
    );
}