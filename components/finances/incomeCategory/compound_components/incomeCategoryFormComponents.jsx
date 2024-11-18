import { Input, Textarea} from "@nextui-org/input";
import {useIncomeCategoryForm } from "./contexts/incomeCategoryFormContext";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FormErrorsClient, FormErrorsServer } from "../../../errors/form_errors/formErrors";


export const IncomeCategoryFormContainer = ({
    children,
    classNames = {
        base: "",
        form: ""
    }
}) => {
    const { id, formData, setErrors, setServerErrors,  validateIncomeCategoryForm ,handleSubmit, router } = useIncomeCategoryForm();
    return (
        <div className={classNames.base}>
            <form
                className={classNames.form}
                onSubmit={id
                    ? (e) => handleSubmit(e, id, formData, setErrors, setServerErrors, `${"/api/finance/incomeCategory"}?id=${id}`, "/finanzas/ingresos/categoria-ingresos", validateIncomeCategoryForm, router)
                    : (e) => handleSubmit(e, id, formData, setErrors, setServerErrors, "/api/finance/incomeCategory", "/finanzas/ingresos/categoria-ingresos", validateIncomeCategoryForm, router)
                }
            >
                {children}
            </form>
        </div>
    )
}

export const IncomeCategoryFormName = ({
    classNames = {
        base: "",
        label: "",
        input: ""
    }
}) => {
    const { formData, handleChange, id, errors, setErrors, setFormData, serverErrors } =  useIncomeCategoryForm();
    return (
        <div className={classNames.base}>
            <Input
                className={classNames.input}
                type="text"
                label="Nombre"
                labelPlacement="outside"
                placeholder="Nombre de la categoría"
                name="name"
                value={formData.name || ""}
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
            />
            <FormErrorsClient errors={errors} errorName="name" />
            <FormErrorsServer errors={serverErrors} errorName="name" />
        </div>
    )
}

export const IncomeCategoryFormDescription = ({
    classNames = {
        base: "",
        label: "",
        input: ""
    }
}) => {
    const { formData, handleChange, id, errors, setErrors, setFormData, serverErrors } = useIncomeCategoryForm();
    return (
        <div className={classNames.base}>
            <Textarea
                className={classNames.input}
                type="text"
                label="Descripción"
                labelPlacement="outside"
                placeholder="Descripción de la categoría"
                name="description"
                value={formData.description || ""}
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
            />
            <FormErrorsClient errors={errors} errorName="description" />
            <FormErrorsServer errors={serverErrors} errorName="description" />
        </div>
    )
}

export const IncomeCategoryFormStatus = ({
    classNames = {
        base: "",
        button: ""
    }
}) => {
    const { formData, setFormData, errors, setErrors, selectedStatus, setSelectedStatus, handleDropdownChange, serverErrors } = useIncomeCategoryForm();
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
                    <DropdownItem key="Activa">Activa</DropdownItem>
                    <DropdownItem key="Inactiva">Inactiva</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <FormErrorsClient errors={errors} errorName="status" />
            <FormErrorsServer errors={serverErrors} errorName="status" />
        </div>
    );
}


