import { Input, Textarea } from "@nextui-org/input";
import { FormErrorsClient, FormErrorsServer } from "../../../errors/form_errors/formErrors";
import { useIncomeForm } from "./contexts/incomeFormContext";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
export const IncomeFormContainer = (
    { children,
        classNames = {
            base: "",
            form: "",
        }
    }
) => {

    const { id, formData, setErrors, setServerErrors, handleSubmit, validateIncomeForm, router } = useIncomeForm();

    return (
        <div className={classNames.base}>
            <form className={classNames.form}
                onSubmit={
                    id
                        ? (e) =>
                            handleSubmit(
                                e,
                                id,
                                formData,
                                setErrors,
                                setServerErrors,
                                `${"/api/finance/income"}?id=${id}`,
                                "/finanzas/ingresos",
                                validateIncomeForm,
                                router
                            )
                        : (e) =>
                            handleSubmit(
                                e,
                                id,
                                formData,
                                setErrors,
                                setServerErrors,
                                "/api/finance/income",
                                "/finanzas/ingresos",
                                validateIncomeForm,
                                router
                            )
                }
            >
                {children}
            </form>
        </div>
    )
};

export const IncomeFormAmount = ({ classNames = {
    base: "",
    input: "",
} }) => {
    const { formData, handleChange, id, errors, setErrors, setFormData, serverErrors } = useIncomeForm();

    return (
        <div className={classNames.base}>
            <Input
                isDisabled={id ? true : false}
                label="Ingreso"
                labelPlacement="outside"
                placeholder="Digite el monto del ingreso"
                value={formData.amount || ""}
                name="amount"
                aria-label="MontoIngreso"
                type="number"
                className={classNames.input}
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
            />
            <FormErrorsClient errors={errors} errorName="amount" />
            <FormErrorsServer serverError={serverErrors} errorName="amount" />
        </div>
    )
};

export const IncomeFormDescription = ({
    classNames = {
        base: "",
        input: "",
    }
}) => {

    const { formData, handleChange, id, errors, setErrors, setFormData, serverErrors } = useIncomeForm();

    return (
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
}

export const IncomeFormProjectDropdown = ({ classNames = { base: "", button: "" } }) => {
    const { id, formData, setFormData, projects, selectedProject, handleDropdownChange, setSelectedProject, errors, setErrors, serverErrors } = useIncomeForm();

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
        <div className={classNames.base}>
            <Dropdown
                isDisabled={id ? true : false}
                className={"dark w-full"} onOpenChange={handleStateOpenChange}>
                <DropdownTrigger>
                    <Button className={"dark w-full"}>
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
};

export const IncomeFormCategoryDropdown = ({ classNames = { base: "", button: "" } }) => {

    const { id, formData, setFormData, incomeCategories, selectedIncomeCategory, handleDropdownChange, setSelectedIncomeCategory, errors, setErrors, serverErrors } = useIncomeForm();

    useEffect(() => {
        if (formData.category) {
            setSelectedIncomeCategory(new Set([formData.category]));
        }
    }, [formData]);

    const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);

    // Get the selected project ID
    const selectedCategoryId = Array.from(selectedIncomeCategory)[0];

    // Find the project name based on the selected ID
    const selectedCategoryName = incomeCategories.find(category => category.idIncomeCategory.toString() === selectedCategoryId.toString())?.name || "Seleccionar Tipo de Ingreso";

    const handleStateOpenChange = (isStateDropdownOpen) => {
        setIsStateDropdownOpen(isStateDropdownOpen);
    };

    return (
        <div className={classNames.base}>
            <Dropdown
                isDisabled={id ? true : false}
                className={"dark"} onOpenChange={handleStateOpenChange}>
                <DropdownTrigger>
                    <Button className={"dark w-full"}>
                        {selectedCategoryName}
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
                    selectedKeys={selectedIncomeCategory}
                    onSelectionChange={(keys) => handleDropdownChange(keys, setSelectedIncomeCategory, setFormData, "category", errors, setErrors)}
                >
                    {incomeCategories.map((category) => (
                        <DropdownItem key={category.idIncomeCategory} value={category.idIncomeCategory}>
                            {category.name}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
            <FormErrorsClient errors={errors} errorName="category" />
            <FormErrorsServer serverError={serverErrors} errorName="category" />
        </div>
    )
}


export const IncomeFormStatusDropdown = ({ classNames = {
    base: "",
    button: "",
} }) => {
    const { formData, setFormData, errors, setErrors, selectedStatus, setSelectedStatus, handleDropdownChange, serverErrors } = useIncomeForm();
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
                    <DropdownItem key={"Ingresado"} value="Ingresado">Ingresado</DropdownItem>
                    <DropdownItem key={"Pendiente"} value="Pendiente">Pendiente</DropdownItem>
                    <DropdownItem key={"Inactivado"} value="Inactivado">Inactivado</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <FormErrorsClient errors={errors} errorName="status" />
            <FormErrorsServer serverError={serverErrors} errorName="status" />
        </div>
    )
}


export const IncomeFormPaymentMethodDropdown = ({ classNames = {
    base: "",
    button: "",
} }) => {
    const { id, formData, setFormData, errors, setErrors, selectedPaymentMethod, setSelectedPaymentMethod, handleDropdownChange, serverErrors } = useIncomeForm();
    const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
    const handleStateOpenChange = (isStateDropdownOpen) => {
        setIsStateDropdownOpen(isStateDropdownOpen);
    }
    useEffect(() => {
        if (formData.paymentMethod) {
            setSelectedPaymentMethod(new Set([formData.paymentMethod]));
        }
    }, [formData.paymentMethod]);

    return (
        <div className={classNames.base}>
            <Dropdown
                isDisabled={id ? true : false}
                className={"dark"}
                onOpenChange={handleStateOpenChange}
            >
                <DropdownTrigger>
                    <Button variant="solid" className={classNames.button}>
                        {selectedPaymentMethod}
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
                    selectedKeys={formData.paymentMethod}
                    onSelectionChange={(keys) => handleDropdownChange(keys, setSelectedPaymentMethod, setFormData, "paymentMethod", errors, setErrors)}
                >
                    <DropdownItem key={"Efectivo"} value="Efectivo">Efectivo</DropdownItem>
                    <DropdownItem key={"Transferencia"} value="Transferencia">Transferencia</DropdownItem>
                    <DropdownItem key={"Cheque"} value="Cheque">Cheque</DropdownItem>
                    <DropdownItem key={"Sinpe"} value="Sinpe">Sinpe</DropdownItem>
                    <DropdownItem key={"Tarjeta"} value="Tarjeta">Tarjeta</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <FormErrorsClient errors={errors} errorName="paymentMethod" />
            <FormErrorsServer serverError={serverErrors} errorName="paymentMethod" />
        </div>
    )
}


