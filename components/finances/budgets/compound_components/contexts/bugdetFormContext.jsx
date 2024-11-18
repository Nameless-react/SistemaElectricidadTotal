import { createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { handleChange, handleDropdownChange, handleSubmit } from "../../../../../functions/handles/formHandles";
import { validateProjectBudgetForm } from "../../../../../functions/validations/projectBudgetValidation";
import { useSession } from "next-auth/react";
const BudgetFormContext = createContext();

export const useBudgetForm = () => useContext(BudgetFormContext);

export const BudgetFormProvider = ({ children, projectBudget, projects }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [formData, setFormData] = useState({
        amount: "",
        description: "",
        date: "",
        status: "",
        project: "",
        user: "",
    });
    const [errors, setErrors] = useState([]);
    const [serverErrors, setServerErrors] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(new Set(["Seleccionar Status"]));
    const [selectedProject, setSelectedProject] = useState(new Set([""]));
    const [selectedUser, setSelectedUser] = useState(new Set());

    useEffect(() => {
        if (session && session.user && session.user.id) {
            setFormData((prevData) => ({
                ...prevData,
                user: session.user.id,
            }));
        }
    }, [session]);

    useEffect(() => {
        if (id) {
            setFormData(projectBudget);
            setSelectedProject(new Set([projectBudget.project]));

        }
    }, [id]);

    useEffect(() => {
        console.log("selectedProject", selectedProject);
        console.log("formDa", formData);
    }, [formData]);
    return (
        <BudgetFormContext.Provider value={{
            router,
            id,
            projects,
            errors,
            serverErrors,
            selectedStatus,
            selectedProject,
            selectedUser,
            formData,
            setFormData,
            setErrors,
            setServerErrors,
            setSelectedStatus,
            setSelectedProject,
            setSelectedUser,
            handleChange,
            handleSubmit,
            validateProjectBudgetForm,
            handleDropdownChange,
        }}>
            {children}
        </BudgetFormContext.Provider>
    );
};
