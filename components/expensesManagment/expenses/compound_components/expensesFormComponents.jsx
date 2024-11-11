import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { useExpensesForm } from "./context/expensesFormContext"
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { button } from "@nextui-org/theme";
import { CategoryDropDown } from "../../expensesManagmentCategoryDropdown";
import { useMemo, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
export const ExpensesFormContainer = (
    { children,
        classNames = {
            base: "",
            form: "",
        }
    }
) => {
    return (
        <div className={classNames.base}>
            <form className={classNames.form}>
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

    const { formData, handleChange, id, errors, setErrors, setFormData } = useExpensesForm();

    return (
        id ? (
            <>
            </>
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
            </div>
        )
    );
}

export const ExpensesFormAmount = ({ classNames = {
    base: "",
    input: "",
} }) => {
    const { formData, handleChange, id, errors, setErrors, setFormData } = useExpensesForm();

    return (
        id ? (
            <>
            </>
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
            </div>
        )
    );
}

export const ExpensesFormDate = ({ classNames = {
    base: "",
    input: "",
} }) => {
    const { formData, handleChange, id, errors, setErrors, setFormData } = useExpensesForm();

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
                    value={formData.date || ""}
                    name="date"
                    aria-label="Fecha"
                    type="date"
                    className={classNames.input}
                    onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                />
            </div>
        )
    );
}

export const ExpensesFormCategory = ({ classNames = {
    base: "",
    button: "",
} }) => {
    const { categories } = useExpensesForm();
    return (
        <div className={classNames.base}>
            <CategoryDropDown categories={categories} title={"Seleccionar Categoría"} classNames={{
                base: "",
                button: "w-full",
            }
            } />
        </div>
    )
}

export const ExpensesFormProject = ({ classNames = {
    base: "",
    button: "",
} }) => {
    const { formData, setFormData, projects, selectedProject, handleDropdownChange, setSelectedProject, errors, setErrors, serverError } = useExpensesForm();
    useEffect(() => {
        if (formData.project) {
            setSelectedProject(new Set([formData.project]));
        }
    }, [formData]);
    const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
    const selectedValue = useMemo(
        () => Array.from(selectedProject).join(", ").replaceAll("_", " "),
        [selectedProject]
    );
    const handleStateOpenChange = (isStateDropdownOpen) => {
        setIsStateDropdownOpen(isStateDropdownOpen);
    };

    return (

        <div className={classNames.base}>
            <Dropdown
                className={"dark"}
                onOpenChange={handleStateOpenChange}
            >
                <DropdownTrigger>
                    <Button
                        variant="flat"
                        className="dark capitalize"
                    >
                        {selectedValue}
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
                    <DropdownItem key="Seleccionar" value={""}>Seleccionar</DropdownItem>
                    {projects.map((project) => (
                        <DropdownItem key={project.name} value={project.name}>
                            {project.name}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

{/* if the user select a project in the projects dropdown, this dropdown was goin to do a fetch to bring the users asociated to that project
    In Case the user select a project, the dropdown of the users will be enabled, and the user will be able to select a user from the dropdown
    */}
export const ExpensesFormUsers = ({ classNames = {
    base: "",
    button: "",
} }) => {
    const { formData, setFormData, users, selectedProject, handleDropdownChange, setSelectedProject, errors, setErrors, serverError } = useExpensesForm();
    useEffect(() => {
        //if the user select a project in the projects dropdown, this dropdown was goin to do a fetch to bring the users asociated to that project
        if (selectedProject) {
            //fetch to get the users asociated to the selected project
            fetch('url', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        }
    }, [selectedProject]);
    return (
        <div className={classNames.base}>
            <Dropdown className={"dark"}>
                <DropdownTrigger>
                    <Button className={classNames.button}>Seleccionar Usuario</Button>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem>
                        Usuario 1
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <p className="text-sm mt-1">(Usuario responsable del gasto)</p>
        </div>
    )
}