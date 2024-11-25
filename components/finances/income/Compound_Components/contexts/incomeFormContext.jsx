import { useContext, createContext, useState, useEffect } from "react";
import { handleChange, handleSubmit, handleDropdownChange } from "../../../../../functions/handles/formHandles";
import { useRouter, useSearchParams } from "next/navigation";

import { useSession } from "next-auth/react";
import { validateIncomeForm } from "../../../../../functions/validations/incomeValidation";
const IncomeFormContext = createContext();

export const useIncomeForm = () => useContext(IncomeFormContext);

export const IncomeFormProvider = ({ children, income, projects, incomeCategories }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [selectedProject, setSelectedProject] = useState(new Set([""]));
    const [selectedIncomeCategory, setSelectedIncomeCategory] = useState(new Set([""]));
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(new Set(["Seleccionar Método de Pago"]));
    const [selectedStatus, setSelectedStatus] = useState(new Set(["Seleccionar Status"]));
    const [serverErrors, setServerErrors] = useState({});

    useEffect(() => {
        if (id) {
            setFormData(income);
        }
    }, [id]);

    useEffect(() => {
        if (session && session.user && session.user.id) {
            setFormData((prevData) => ({
                ...prevData,
                user: session.user.id,
            }));
        }
    }, [session]);

    return (
        <IncomeFormContext.Provider
            value={
                {
                    id,
                    router,
                    projects,
                    incomeCategories,
                    formData,
                    errors,
                    serverErrors,
                    selectedProject,
                    selectedIncomeCategory,
                    selectedPaymentMethod,
                    selectedStatus,
                    setSelectedStatus,
                    setSelectedPaymentMethod,
                    setSelectedProject,
                    setSelectedIncomeCategory,
                    setFormData,
                    setErrors,
                    setServerErrors,
                    handleChange,
                    handleSubmit,
                    validateIncomeForm,
                    handleDropdownChange
                }
            }>
            {children}
        </IncomeFormContext.Provider>
    )
}