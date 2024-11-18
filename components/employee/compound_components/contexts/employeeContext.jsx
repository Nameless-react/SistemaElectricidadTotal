import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { handleChange, handleDropdownChange } from "../../../../functions/handles/formHandles";
import { validateEmployeeForm } from "../../../../functions/validations/employeeValidation2";
import { handleSubmit } from "../../../../functions/handles/employeeHandle";

const EmployeeFormContext = createContext();

export const useEmployeeForm = () => useContext(EmployeeFormContext);

export const EmployeeFormProvider = ({ children, employee, users }) => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [formData, setFormData] = useState({
        job: "",
        joinAt: new Date(),
        userId: ""
    });
    const [errors, setErrors] = useState([]);
    const [serverErrors, setServerErrors] = useState([]);
    const [selectedUser, setSelectedUser] = useState(new Set());

    useEffect(() => {
        if (id) {
            setFormData(employee);
            setSelectedUser(new Set([employee.userId]));
        }
    }, [id])
    return (
        <EmployeeFormContext.Provider
            value={{
                router,
                id,
                errors,
                serverErrors,
                selectedUser,
                formData,
                users,
                setFormData,
                setErrors,
                setServerErrors,
                setSelectedUser,
                handleChange,
                handleDropdownChange,
                validateEmployeeForm,
                handleSubmit
            }}
        >
            {children}
        </EmployeeFormContext.Provider>
    )
}

