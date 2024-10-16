import React from 'react'
import { Input, Textarea } from "@nextui-org/input";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useToolsForm } from "../context/toolsFormContext";
import { Checkbox } from '@nextui-org/checkbox';
import { UploadImage } from '../../../../images/formImages';
import { FormErrorsClient, FormErrorsServer } from '../../../../errors/form_errors/formErrors';
export const ToolForm = ({ className = "", children }) => {
    const { handleSubmit, formData, setErrors, setServerError, isChecked, setIsChecked, id, router } = useToolsForm();

    return (
        <div className={className}>
            <form
                onSubmit={id
                    ? (e) => handleSubmit(e, id, formData, setErrors, setServerError, isChecked, `${process.env.NEXT_PUBLIC_URL_TOOLS_UPDATE}?id=${id}`, process.env.NEXT_PUBLIC_URL_TOOLS, router)
                    : (e) => handleSubmit(e, id, formData, setErrors, setServerError, isChecked, process.env.NEXT_PUBLIC_URL_TOOLS_CREATE, process.env.NEXT_PUBLIC_URL_TOOLS, router)
                }>
                {children}
            </form>
        </div>
    )
}
export const ToolName = ({ className = "" }) => {
    const { formData, setFormData, handleChange, errors, setErrors, serverError } = useToolsForm();

    return (
        <div className={className}>
            <Input
                bordered
                color="default "
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                label="Nombre"
                name="name"
                value={formData.name || ""}
                labelPlacement="outside"
                className="dark w-full"
                size="md"
                placeholder="Nombre del equipo"
            />
            <FormErrorsClient errors={errors} errorName={"name"} />
            <FormErrorsServer serverError={serverError} errorName={"name"} />

        </div>
    )
}

export const ToolModel = ({ className = "" }) => {
    const { formData, setFormData, handleChange, errors, setErrors, serverError } = useToolsForm();
    return (
        <div className={className}>
            <Input
                bordered
                label="Modelo"
                name="model"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                value={formData.model || ""}
                labelPlacement="outside"
                className="dark w-full"
                color="default "
                size="md"
                placeholder="Modelo"
            />
            <FormErrorsClient errors={errors} errorName={"model"} />
            <FormErrorsServer serverError={serverError} errorName={"model"} />

        </div>
    );
}

export const ToolDescription = ({ className = "" }) => {
    const { formData, setFormData, handleChange, errors, setErrors, serverError } = useToolsForm();
    return (
        <div className={className}>
            <Textarea
                name="description"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                value={formData.description || ""}
                labelPlacement="inside"
                className="dark"
                placeholder="Descripción" />

            <FormErrorsClient errors={errors} errorName={"description"} />
            <FormErrorsServer serverError={serverError} errorName={"description"} />
        </div>
    )
}

export const ToolCost = ({ className = "" }) => {
    const { formData, setFormData, handleChange, errors, setErrors, serverError } = useToolsForm();
    return (
        <div className={className}>
            <Input
                bordered
                label="Costo"
                name="cost"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                value={formData.cost || ""}
                labelPlacement="outside"
                type="number"
                color="default "
                className="dark w-full"
                size="md"
                placeholder="Costo"
            />
            <FormErrorsClient errors={errors} errorName={"cost"} />
            <FormErrorsServer serverError={serverError} errorName={"cost"} />
        </div>

    )
}

export const ToolDate = ({ className = "" }) => {
    const { formData, setFormData, handleChange, errors, setErrors, serverError } = useToolsForm();
    return (
        <div className={className}>
            <Input
                bordered
                name="date"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                value={formData.date || ""}
                label="Fecha de compra"
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

export const ToolSerial = ({ className = "" }) => {
    const { formData, setFormData, handleChange, errors, setErrors, serverError } = useToolsForm();
    React.useEffect(() => {
        console.log(serverError)
    }, [serverError])
    return (
        <div className={className}>
            <Input
                bordered
                label="Serial"
                name="serial"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                value={formData.serial || ""}
                labelPlacement="outside"
                className="dark w-full"
                color="default "
                size="md"
                placeholder="Serial"
            />
            <FormErrorsClient errors={errors} errorName={"serial"} />
            <FormErrorsServer serverError={serverError} errorName={"serial"} />
            {serverError.error && serverError.error.serial_error && (
                <p className="text-red-600 text-sm mt-1">
                    {serverError.error.serial_error.message}
                </p>
            )}
        </div>
    )
}

export const ToolImage = ({ }) => {
    const { formData, setFormData, imagePreview, setImagePreview, handleImageChange, handleImageRemove, errors, setErrors, serverError } = useToolsForm();

    return (
        <div>
            <UploadImage
                className='flex flex-col items-center'
                formData={formData}
                setFormData={setFormData}
                imagePreview={imagePreview}
                setErrors={setErrors}
                errors={errors}
                setImagePreview={setImagePreview}
                handleImageChange={handleImageChange}
                handleImageRemove={handleImageRemove}
            />
            <div className='flex flex-col items-center'>
                <FormErrorsClient errors={errors} errorName={"image"} />
                <FormErrorsServer serverError={serverError} errorName={"image"} />
            </div>
        </div>
    )
}

export const ToolStatusDropdown = ({ className = "" }) => {
    const { formData, setFormData, handleDropdownChange, errors, setErrors, serverError } = useToolsForm();
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
                    <DropdownItem key="Disponible">Disponible</DropdownItem>
                    <DropdownItem key="No disponible">No Disponible</DropdownItem>
                    <DropdownItem key="En reparacion">En Reparación</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <div>
                <FormErrorsClient errors={errors} errorName={"status"} />
                <FormErrorsServer serverError={serverError} errorName={"status"} />
            </div>
        </div>
    );
};

export const ToolsCategoryDropdown = ({ className = "" }) => {
    const { formData, setFormData, handleDropdownChange, errors, setErrors, serverError } = useToolsForm();
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Seleccionar"]));
    const [isStateDropdownOpen, setIsStateDropdownOpen] = React.useState(false);
    const { categories } = useToolsForm();

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

export const ToolsProviderDropdown = ({ className = "" }) => {
    const { formData, setFormData, handleDropdownChange, errors, setErrors, serverError } = useToolsForm();
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Seleccionar"]));
    const [isStateDropdownOpen, setIsStateDropdownOpen] = React.useState(false);
    const { providers } = useToolsForm();

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
            <label className="text-white">Proveedorador</label>
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

export const ToolsMaintenanceNotesCheckbox = ({ className = "" }) => {

    const { formData, setFormData, isChecked, setIsChecked, handleChange, errors, setErrors } = useToolsForm();
    const [isNotesCheckboxOpen, setIsNotesCheckboxOpen] = React.useState(false);

    React.useEffect(() => {
        if (!isChecked) {
            setFormData({ ...formData, notes: "", checkedMaintenanceNotes: false });
        }
    }, [isChecked]);

    React.useEffect(() => {
        if (formData.status === "En reparacion") {
            setIsNotesCheckboxOpen(true);
        }
        else {
            setIsNotesCheckboxOpen(false);
        }
    }, [formData.status]);

    const handleCheckChange = (e) => {
        setIsChecked(e.target.checked);
        setFormData({ ...formData, checkedMaintenanceNotes: e.target.checked });
    }
    return (
        <div className={className}>
            {isNotesCheckboxOpen && (
                <>
                    <div className="flex items-center space-x-2 mb-4">
                        <Checkbox id="notes" onChange={handleCheckChange} />
                        <label
                            htmlFor="notes"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            ¿Desea agregar notas de mantenimiento?
                        </label>
                    </div>

                    <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isChecked ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                    >
                        <div>
                            <Textarea
                                name="notes"
                                value={formData.notes || ""}
                                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                                className="w-full rounded-lg p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                placeholder="Escriba una nota de mantenimiento"
                            />
                            {errors.notes && (
                                <>
                                    {errors.notes._errors.includes("Required") ? (
                                        <p className="text-sm text-red-600 ml-2 mt-2">La nota de mantenimiento es requerida</p>
                                    ) : (
                                        errors.notes._errors.map((error, index) => (
                                            <p key={index} className="text-sm text-red-600 ml-2 mt-2">{error}</p>
                                        ))
                                    )}
                                </>
                            )}
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-stretch gap-4 mb-5 mt-5 sm:mt-8 max-w-4xl mx-auto">
                            <div className="flex-1 min-w-0">
                                <ToolStartMaintenanceDate className="h-full" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <ToolExpectedRecoveryDate className="h-full" />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export const ToolExpectedRecoveryDate = ({ className = "" }) => {

    const { formData, setFormData, handleChange, errors, setErrors } = useToolsForm();

    return (
        <div className={className}>
            <Input
                bordered
                name="recoveryDate"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                value={formData.recoveryDate || ""}
                label="Fecha de recuperación esperada"
                labelPlacement="outside"
                type="date"
                className="dark w-full"
                color="default "
                size="md"
            />
            {errors.recoveryDate && (
                <>
                    {errors.recoveryDate._errors.includes("Invalid date") ? (
                        <p className="text-sm text-red-600 ml-2 mt-2">La fecha de recuperación es requerida</p>
                    ) : (
                        errors.recoveryDate._errors.map((error, index) => (
                            <p key={index} className="text-sm text-red-600 ml-2 mt-2">{error}</p>
                        ))
                    )}
                </>
            )}
        </div>
    )
}

export const ToolStartMaintenanceDate = ({ className = "" }) => {
    const { formData, setFormData, handleChange, errors, setErrors } = useToolsForm();
    return (
        <div className={className}>
            <Input
                bordered
                name="startMaintenanceDate"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                value={formData.startMaintenanceDate || ""}
                label="Fecha de recuperación esperada"
                labelPlacement="outside"
                type="date"
                className="dark w-full"
                color="default "
                size="md"
            />
            {errors.startMaintenanceDate && (
                <>
                    {errors.startMaintenanceDate._errors.includes("Invalid date") ? (
                        <p className="text-sm text-red-600 ml-2 mt-2">La fecha de inicio de mantenimiento es requerida</p>
                    ) : (
                        errors.startMaintenanceDate._errors.map((error, index) => (
                            <p key={index} className="text-sm text-red-600 ml-2 mt-2">{error}</p>
                        ))
                    )}
                </>
            )}

        </div>
    )
}







