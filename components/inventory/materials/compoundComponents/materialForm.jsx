import { Input, Textarea } from "@nextui-org/input";
import { useMaterialForm } from "./context/materialFormContext";
import { Button } from "@nextui-org/button";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { FormErrorsClient, FormErrorsServer } from "../../../errors/form_errors/formErrors";
export const MaterialForm = ({ className = "", children }) => {
    const { handleSubmit, formData, setErrors, setServerError, id, router, serverError } = useMaterialForm();

    const submitUrl = id
        ? `${process.env.NEXT_PUBLIC_URL_MATERIALS_MATERIAL}?id=${id}`
        : process.env.NEXT_PUBLIC_URL_MATERIALS_MATERIAL;

    return (
        <div className={className}>
            <form
                onSubmit={(e) => handleSubmit(
                    e,
                    id,
                    formData,
                    setErrors,
                    setServerError,
                    submitUrl,
                    process.env.NEXT_PUBLIC_URL_MATERIALS,
                    router
                )}
            >
                {children}
                { serverError && serverError.error && <p className="text-red-500 text-center mt-4">{serverError.error.internal_server_error.message}</p> }
            </form>
        </div>
    );
};
export const MaterialName = ({ className = "" }) => {
    const { formData, setFormData, errors, setErrors, handleChange, setServerError, serverError } = useMaterialForm();

    return (
        <div className={className}>

            <Input
                bordered
                color="default"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                label="Nombre"
                name="name"
                value={formData.name || ""}
                labelPlacement="outside"
                className="dark w-full"
                size="md"
                placeholder="Nombre del material"
            />
            <FormErrorsClient errors={errors} errorName={"name"} />
            <FormErrorsServer serverError={serverError} errorName={"name"} />
        </div>
    )
}

export const MaterialCost = ({ className = "" }) => {

    const { formData, setFormData, errors, setErrors, handleChange, setServerError, serverError } = useMaterialForm();

    return (
        <div className={className}>
            <Input

                bordered
                color="default"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                label="Costo"
                name="cost"
                placeholder="Costo"
                value={formData.cost || ""}
                labelPlacement="outside"
                type="number"
                className="dark w-full"
                size="md"
            />
            <FormErrorsClient errors={errors} errorName={"cost"} />
            <FormErrorsServer serverError={serverError} errorName={"cost"} />
        </div>
    )
}
export const MaterialStock = ({ className = "" }) => {

    const { formData, setFormData, errors, setErrors, handleChange, setServerError, serverError } = useMaterialForm();

    return (
        <div className={className}>
            <Input

                bordered
                color="default"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                label="Stock"
                name="stock"
                value={formData.stock || ""}
                labelPlacement="outside"
                placeholder="Stock"
                type="number"
                className="dark w-full"
                size="md"
            />
            <FormErrorsClient errors={errors} errorName={"stock"} />
            <FormErrorsServer serverError={serverError} errorName={"stock"} />
        </div>
    )
}


export const MaterialDescription = ({ className = "" }) => {
    const { formData, setFormData, errors, setErrors, handleChange, setServerError, serverError } = useMaterialForm();

    return (
        <div className={className}>

            <Textarea
                bordered
                color="default"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                label="Descripción"
                name="description"
                value={formData.description || ""}
                labelPlacement="outside"
                className="dark w-full"
                size="md"
                placeholder="Descripción del material" />
            <FormErrorsClient errors={errors} errorName={"description"} />
            <FormErrorsServer serverError={serverError} errorName={"description"} />
        </div>
    )
}

export const MaterialExpiration = ({ className = "" }) => {
    const { formData, setFormData, errors, setErrors, handleChange, setServerError, serverError } = useMaterialForm();

    return (
        <div className={className}>

            <Input
                bordered
                color="default"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                label="Fecha de expiración"
                name="expiration"
                value={formData.expiration || ""}
                labelPlacement="outside"
                type="date"
                className="dark w-full"
                size="md"
            />
            <FormErrorsClient errors={errors} errorName={"expiration"} />
            <FormErrorsServer serverError={serverError} errorName={"expiration"} />
        </div>
    )
}

export const MaterialDate = ({ className = "" }) => {
    const { formData, setFormData, handleChange, errors, setErrors, serverError } = useMaterialForm();
    return (
        <div className={className}>
            <Input
                bordered
                name="date"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                value={formData.date || ""}
                label="Ultima fecha de compra"
                labelPlacement="outside"
                type="date"
                className="dark w-full"
                color="default "
                size="md"
            />
            <FormErrorsClient errors={errors} errorName={"date"} />
            <FormErrorsServer serverError={serverError} errorName={"date"} />
        </div>
    )
}


export const MaterialStatusDropdown = ({ className = "" }) => {
    const { formData, setFormData, handleDropdownChange, errors, setErrors, serverError } = useMaterialForm();
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Seleccionar"]));
    const [isStateDropdownOpen, setIsStateDropdownOpen] = React.useState(false);
    React.useEffect(() => {
        if (formData.status) {
            setSelectedKeys(new Set([formData.status]));
        }
    }, [formData]);

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    const handleStateOpenChange = (isOpen) => {
        setIsStateDropdownOpen(isOpen);
    };


    return (
        <div className={className}>
            <label className="text-white">Estado</label>
            <Dropdown
                className='dark w-full'
                isOpen={isStateDropdownOpen}
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
                    aria-label="Estado selection"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={(keys) => handleDropdownChange(keys, setSelectedKeys, setFormData, "status", errors, setErrors)}
                >
                    <DropdownItem key="Seleccionar"  >Seleccionar</DropdownItem>
                    <DropdownItem key="Activo">Activo</DropdownItem>
                    <DropdownItem key="Inactivo">Inactivo</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <div>
                <FormErrorsClient errors={errors} errorName={"status"} />
                <FormErrorsServer serverError={serverError} errorName={"status"} />
            </div>
        </div>
    );
};

export const MaterialCategoryDropdown = ({ className = "" }) => {
    const { formData, setFormData, handleDropdownChange, errors, setErrors, serverError } = useMaterialForm();
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Seleccionar"]));
    const [isStateDropdownOpen, setIsStateDropdownOpen] = React.useState(false);
    const { categories } = useMaterialForm();

    React.useEffect(() => {
        if (formData.category) {
            setSelectedKeys(new Set([formData.category]));
        }
    }, [formData]);

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );
    const handleStateOpenChange = (isStateDropdownOpen) => {
        setIsStateDropdownOpen(isStateDropdownOpen);
    };


    return (
        <div className={className}>
            <label className="text-white">Categoría</label>
            <Dropdown
                className='dark w-full '
                open={isStateDropdownOpen}
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
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={(keys) => handleDropdownChange(keys, setSelectedKeys, setFormData, "category", errors, setErrors)}
                >
                    <DropdownItem key="Seleccionar" value={""}>Seleccionar</DropdownItem>
                    {categories.map((category) => (
                        <DropdownItem key={category.name}>{category.name}</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
            <div>
                <FormErrorsClient errors={errors} errorName={"category"} />
                <FormErrorsServer serverError={serverError} errorName={"category"} />
            </div>
        </div>
    )
}


export const MaterialProviderDropdown = ({ className = "" }) => {
    const { formData, setFormData, handleDropdownChange, errors, setErrors, serverError } = useMaterialForm();
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Seleccionar"]));
    const [isStateDropdownOpen, setIsStateDropdownOpen] = React.useState(false);
    const { providers } = useMaterialForm();

    React.useEffect(() => {
        console.log(formData)
        if (formData.provider) {

            setSelectedKeys(new Set([formData.provider]));
        }
    }, [formData]);

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );
    const handleStateOpenChange = (isStateDropdownOpen) => {
        setIsStateDropdownOpen(isStateDropdownOpen);
    };

    return (
        <div className={className}>
            <label className="text-white">Proveedor</label>
            <Dropdown
                className='dark w-full '
                open={isStateDropdownOpen}
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
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={(keys) => handleDropdownChange(keys, setSelectedKeys, setFormData, "provider", errors, setErrors)}
                >
                    <DropdownItem key="Seleccionar" value="">Seleccionar</DropdownItem>
                    {providers.map((provider) => (
                        <DropdownItem key={provider.name}>{provider.name}</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
            <div>
                <FormErrorsClient errors={errors} errorName={"provider"} />
                <FormErrorsServer serverError={serverError} errorName={"provider"} />
            </div>
        </div>
    )
}



