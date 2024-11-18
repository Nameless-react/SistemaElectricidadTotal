import { Input, Textarea } from "@nextui-org/input";
import { useBudgetForm } from "./contexts/bugdetFormContext";
import { useEffect, useMemo, useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FormErrorsClient, FormErrorsServer } from "../../../errors/form_errors/formErrors";

export const BudgetFormContainer = ({
    children,
    classNames = {
        base: "",
        form: ""
    }

}) => {

    const { id, formData, setErrors, setServerErrors, validateProjectBudgetForm, handleSubmit, router } = useBudgetForm();
    return (
        <div className={classNames.base}>
            <form

                className={classNames.form}
                onSubmit={id
                    ? (e) => handleSubmit(e, id, formData, setErrors, setServerErrors, `${"/api/finance/projectBudget"}?id=${id}`, "/finanzas/presupuestos", validateProjectBudgetForm, router)
                    : (e) => handleSubmit(e, id, formData, setErrors, setServerErrors, "/api/finance/projectBudget", "/finanzas/presupuestos", validateProjectBudgetForm, router)
                }
            >
                {children}
            </form>
        </div>
    )
}

export const BudgetFormAmount = ({
    classNames = {
        base: "",
        label: "",
        input: ""
    }
}) => {
    const { formData, handleChange, id, errors, setErrors, setFormData, serverErrors } = useBudgetForm();
    return (
        <div className={classNames.base}>
            <Input
                className={classNames.input}
                type="number"
                label="Monto"
                labelPlacement="outside"
                placeholder="Monto"
                name="amount"
                value={formData.amount || ""}
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
            />
            <FormErrorsClient errors={errors} errorName="amount" />
            <FormErrorsServer errors={serverErrors} errorName="amount" />
        </div>
    )
}

export const BudgetFormDescription = ({
    classNames = {
        base: "",
        label: "",
        input: ""
    }
}) => {
    const { formData, handleChange, id, errors, setErrors, setFormData, serverErrors } = useBudgetForm();
    return (
        <div className={classNames.base}>
            <Textarea
                className={classNames.input}
                type="text"
                label="Descripción"
                labelPlacement="outside"
                placeholder="Descripción"
                name="description"
                value={formData.description || ""}
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
            />
            <FormErrorsClient errors={errors} errorName="description" />
            <FormErrorsServer errors={serverErrors} errorName="description" />
        </div>
    )
}


export const BudgetFormDate = ({
    classNames = {
        base: "",
        label: "",
        input: ""
    }
}) => {
    const { formData, handleChange, id, errors, setErrors, setFormData, serverErrors } = useBudgetForm();
    return (
        <div className={classNames.base}>
            <Input
                className={classNames.input}
                type="date"
                label="Fecha"
                labelPlacement="outside"
                placeholder="Fecha"
                name="date"
                value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ""}
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
            />
             <FormErrorsClient errors={errors} errorName="date" />
             <FormErrorsServer errors={serverErrors} errorName="date" />
        </div>
    )
}

export const BudgetFormStatus = ({
    classNames = {
        base: "",
        label: "",
        input: ""
    }
}) => {
    const { formData, setFormData, errors, setErrors, selectedStatus, setSelectedStatus, handleDropdownChange, serverErrors } = useBudgetForm();
    const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);

    useEffect(() => {
        if (formData.status) {
            setSelectedStatus(new Set([formData.status]));
        }
    }, [formData.status]);

    const selectedValue = useMemo(
        () => Array.from(selectedStatus).join(", ").replaceAll("_", " "), [selectedStatus]
    );

    const handleStateOpenChange = (isOpen) => {
        setIsStateDropdownOpen(isOpen);
    }

    return (
        <div className={classNames.base}>
            <Dropdown
                className="dark w-full"
                isOpen={isStateDropdownOpen}
                onOpenChange={handleStateOpenChange}
            >
                <DropdownTrigger>
                    <Button
                        className={classNames.button}
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
                    aria-label="Dropdown menu"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedStatus}
                    onSelectionChange={(keys) => handleDropdownChange(keys, setSelectedStatus, setFormData, "status", errors, setErrors)}
                >
                    <DropdownItem key="Activo">Activo</DropdownItem>
                    <DropdownItem key="Inactivo">Inactivo</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <FormErrorsClient errors={errors} errorName="status" />
            <FormErrorsServer errors={serverErrors} errorName="status" />
        </div>
    )
}

export const BudgetFormProject = ({
    classNames = {
        base: "",
        button: ""
    }
}) => {
    const { formData, setFormData, projects, selectedProject, handleDropdownChange, setSelectedProject, errors, setErrors, serverErrors} = useBudgetForm();
    useEffect(() => {
        if (formData.project) {
            setSelectedProject(new Set([formData.project]));
        }
    }, [formData.project]);

    const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);

    const selectedProjectId = Array.from(selectedProject)[0];

    const selectedProjectName = projects.find(project => project.idProjects.toString() === selectedProjectId.toString())?.name || "Seleccionar Proyecto";


    const handleStateOpenChange = (isOpen) => {
        setIsStateDropdownOpen(isOpen);
    }

    return (
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
            <FormErrorsServer errors={serverErrors} errorName="project" />
        </div>
    );
}
