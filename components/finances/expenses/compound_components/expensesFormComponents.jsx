import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { useExpensesForm } from "./context/expensesFormContext"
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { button } from "@nextui-org/theme";
import { CategoryDropDown } from "../../expensesManagmentCategoryDropdown";
import { useMemo, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FormErrorsClient, FormErrorsServer } from "../../../errors/form_errors/formErrors";
export const ExpensesFormContainer = (
    { children,
        classNames = {
            base: "",
            form: "",
        }
    }
) => {
    const { id, formData, setErrors, setServerErrors, validateProjectExpenseForm, handleSubmit, router } = useExpensesForm();
    return (
        <div className={classNames.base}>
            <form className={classNames.form}
                onSubmit={
                    id ? (e) => handleSubmit(e, id, formData, setErrors, setServerErrors, `/api/expensesProjects?id=${id}`, "/finanzas/gastos", validateProjectExpenseForm, router)
                        : (e) => handleSubmit(e, id, formData, setErrors, setServerErrors, "/api/expensesProjects", "/finanzas/gastos", validateProjectExpenseForm, router)
                }
            >
                {children}
            </form>
        </div>
    )
};

export const ExpensesFromDescription = ({
    classNames = {
        base: "",
        input: "",
    }
}) => {

    const { formData, handleChange, id, errors, setErrors, setFormData, serverErrors } = useExpensesForm();
    useEffect(() => {
        console.log(formData);
    }
        , [formData]);
    return (
        id ? (
            null
        ) : (
            <div className={classNames.base}>
                <Textarea
                    label="Descripción"
                    labelPlacement="outside"
                    placeholder="Descripción del gasto"
                    value={formData.description || ""}
                    className={classNames.input}
                    name="description"
                    aria-label="Descripción"
                    onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                />
                <FormErrorsClient errors={errors} errorName="description" />
                <FormErrorsServer serverError={serverErrors} errorName="description" />
            </div>
        )
    );
}

export const ExpensesFormAmount = ({ classNames = {
    base: "",
    input: "",
} }) => {
    const { formData, handleChange, id, errors, setErrors, setFormData, serverErrors } = useExpensesForm();

    return (
        id ? (
            null
        ) : (
            <div className={classNames.base}>
                <Input
                    label="Monto"
                    labelPlacement="outside"
                    placeholder="Monto"
                    value={formData.amount || ""}
                    name="amount"
                    aria-label="Monto"
                    type="number"
                    className={classNames.input}
                    onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                />
                <FormErrorsClient errors={errors} errorName="amount" />
                <FormErrorsServer serverError={serverErrors} errorName="amount" />
            </div>
        )
    );
}

export const ExpensesFormDate = ({ classNames = {
    base: "",
    input: "",
} }) => {
    const { formData, handleChange, id, errors, setErrors, setFormData, serverErrors } = useExpensesForm();
    useEffect(() => {
        console.log(formData);
    }
        , [formData]);
    return (
        id ? (
            <>
            </>
        ) : (
            <div className={classNames.base}>
                <Input
                    label="Fecha"
                    labelPlacement="outside"
                    placeholder="Fecha"
                    value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ""}
                    name="date"
                    aria-label="Fecha"
                    type="date"
                    className={classNames.input}
                    onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                />
                <FormErrorsClient errors={errors} errorName="date" />
                <FormErrorsServer serverError={serverErrors} errorName="date" />
            </div>
        )
    );
}

export const ExpensesFormCategory = ({ classNames = {
    base: "",
    button: "",
} }) => {
    const { id, categories, formData, setFormData, selectedCategory, setSelectedCategory, errors, setErrors, handleDropdownChange, serverErrors } = useExpensesForm();


    const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);

    const selectedCategoryId = selectedCategory.size > 0 ? Array.from(selectedCategory)[0] : null;

    const selectedCategoryName = selectedCategoryId
        ? categories.find(category => category.idExpenseCategory.toString() === selectedCategoryId.toString())?.name || "Seleccionar Categoría"
        : "Seleccionar Categoría";

    const handleStateOpenChange = (isStateDropdownOpen) => {
        setIsStateDropdownOpen(isStateDropdownOpen);
    };

    useEffect(() => {
        if (formData.category) {
            setSelectedCategory(new Set([formData.category]));
        }
    }, [formData]);

    return (
        id ? (
            null
        ) : (
            <div className={classNames.base}>
                <CategoryDropDown
                    categories={categories}
                    title={"Seleccionar Categoría"}
                    classNames={{
                        base: "",
                        button: "w-full",
                    }}
                    selectedCategoryName={selectedCategoryName}
                    selectedCategory={selectedCategory}
                    handleStateOpenChange={handleStateOpenChange}
                    isStateDropdownOpen={isStateDropdownOpen}
                    handleDropdownChande={(keys) => handleDropdownChange(keys, setSelectedCategory, setFormData, "category", errors, setErrors)}
                />
                <FormErrorsClient errors={errors} errorName="category" />
                <FormErrorsServer serverError={serverErrors} errorName="category" />
            </div >
        )
    )
}

export const ExpensesFormProject = ({ classNames = { base: "", button: "" } }) => {
    const { id, formData, setFormData, projects, selectedProject, handleDropdownChange, setSelectedProject, errors, setErrors, serverErrors } = useExpensesForm();

    useEffect(() => {
        if (formData.project) {
            setSelectedProject(new Set([formData.project]));
        }
    }, [formData]);

    const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);

    // Get the selected project ID
    const selectedProjectId = Array.from(selectedProject)[0];

    // Find the project name based on the selected ID
    const selectedProjectName = projects.find(project => project.idProjects.toString() === selectedProjectId.toString())?.name || "Seleccionar Proyecto";


    const handleStateOpenChange = (isStateDropdownOpen) => {
        setIsStateDropdownOpen(isStateDropdownOpen);
    };

    return (
        id ? (
            null

        ) : (
            <div className={classNames.base}>
                <Dropdown className={"dark"} onOpenChange={handleStateOpenChange}>
                    <DropdownTrigger>
                        <Button className="dark capitalize">
                            {selectedProjectName}
                            <div>
                                <FontAwesomeIcon
                                    icon={faCaretDown}
                                    className={`ml-1 transition-transform duration-200 ${isStateDropdownOpen ? 'rotate-180' : ''}`}
                                />
                            </div>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Proyectos"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedProject}
                        onSelectionChange={(keys) => handleDropdownChange(keys, setSelectedProject, setFormData, "project", errors, setErrors)}
                    >
                        {projects.map((project) => (
                            <DropdownItem key={project.idProjects} value={project.idProjects}>
                                {project.name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                <FormErrorsClient errors={errors} errorName="project" />
                <FormErrorsServer serverError={serverErrors} errorName="project" />
            </div>
        )
    );
};


{/* if the user select a project in the projects dropdown, this dropdown was goin to do a fetch to bring the users asociated to that project
    In Case the user select a project, the dropdown of the users will be enabled, and the user will be able to select a user from the dropdown
    */}
export const ExpensesFormUsers = ({ classNames = {
    base: "",
    button: "",
} }) => {


    const { id, formData, setFormData, users, setUsers, selectedProject, selectedUser, setSelectedUser, handleDropdownChange, setSelectedProject, errors, setErrors, serverErrors } = useExpensesForm();

    useEffect(() => {

        //if the user select a project in the projects dropdown, this dropdown was goin to do a fetch to bring the users asociated to that project
        if (Array.from(selectedProject)[0] !== "") {
            //fetch to get the users asociated to the selected project
            fetch(`/api/teams/project/${Array.from(selectedProject)[0]}`, {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    setUsers(data);
                });
        }
    }, [selectedProject]);
    const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
    const selectedUserId = selectedUser.size > 0 ? Array.from(selectedUser)[0] : null;

    const selectedUserName = selectedUserId
        ? users.find(user => user.userid.toString() === selectedUserId.toString())?.name || "Seleccionar Usuario"
        : "Seleccionar Usuario";

    const handleStateOpenChange = (isStateDropdownOpen) => {
        setIsStateDropdownOpen(isStateDropdownOpen);
    };


    useEffect(() => {
        if (formData.user) {
            setSelectedUser(new Set([formData.user]));
        }
    }, [formData]);

    return (
        id ? (
            null
        ) : (
            <div className={classNames.base}>
                <Dropdown className={"dark"}
                    onOpenChange={handleStateOpenChange}
                >
                    <DropdownTrigger>
                        <Button variant="solid" className={classNames.button}>
                            {selectedUserName}
                            <div>
                                <FontAwesomeIcon
                                    icon={faCaretDown}
                                    className={`ml-1 transition-transform duration-200 ${isStateDropdownOpen ? 'rotate-180' : ''}`}
                                />
                            </div>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Usuarios"
                        variant="solid"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedUser}
                        emptyContent="No hay usuarios asociados a este proyecto"
                        onSelectionChange={(keys) => handleDropdownChange(keys, setSelectedUser, setFormData, "user", errors, setErrors)}
                    >
                        {users.map((user) => (
                            <DropdownItem key={user.userid} value={user.userid}>
                                {user.name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                <p className="text-sm mt-1">(Usuario responsable del gasto)</p>
                <FormErrorsClient errors={errors} errorName="user" />
                <FormErrorsServer serverError={serverErrors} errorName="user" />
            </div>
        )
    )
}

export const ExpensesFormStatus = ({ classNames = {
    base: "",
    button: "",
} }) => {
    const { formData, setFormData, errors, setErrors, selectedStatus, setSelectedStatus, handleDropdownChange, serverErrors } = useExpensesForm();
    const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
    const handleStateOpenChange = (isStateDropdownOpen) => {
        setIsStateDropdownOpen(isStateDropdownOpen);
    }
    useEffect(() => {
        if (formData.status) {
            setSelectedStatus(new Set([formData.status]));
        }
    }, [formData.status]);

    return (
        <div className={classNames.base}>
            <Dropdown className={"dark"}
                onOpenChange={handleStateOpenChange}
            >
                <DropdownTrigger>
                    <Button variant="solid" className={classNames.button}>
                        {selectedStatus}
                        <div>
                            <FontAwesomeIcon
                                icon={faCaretDown}
                                className={`ml-1 transition-transform duration-200 ${isStateDropdownOpen ? 'rotate-180' : ''}`}
                            />
                        </div>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Estado"
                    variant="solid"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={formData.status}
                    onSelectionChange={(keys) => handleDropdownChange(keys, setSelectedStatus, setFormData, "status", errors, setErrors)}
                >
                    <DropdownItem key={"Pendiente"} value="Pendiente">Pendiente</DropdownItem>
                    <DropdownItem key={"Aprobado"} value="Aprobado">Aprobado</DropdownItem>
                    <DropdownItem key={"Denegado"} value="Rechazado">Rechazado</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <FormErrorsClient errors={errors} errorName="status" />
            <FormErrorsServer serverError={serverErrors} errorName="status" />
        </div>
    )
}