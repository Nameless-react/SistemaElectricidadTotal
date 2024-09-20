import React, { Suspense } from 'react'
import { Input, Textarea } from "@nextui-org/input";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCaretDown, faCaretUp, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useToolsForm } from "../context/toolsFormContext";
import { Checkbox } from '@nextui-org/checkbox';

import Image from 'next/image';
import { UploadImage } from '../../../../images/formImages';

export const ToolForm = ({ className = "", children }) => {
    const { handleSubmitCreate, formData, setErrors, setServerError, isChecked, setIsChecked } = useToolsForm();

    return (
        <div className={className}>
            <form onSubmit={(e) => handleSubmitCreate(e, formData, setErrors, setServerError, isChecked)}>
                {children}
            </form>
        </div>
    )
}

export const ToolName = ({ className = "" }) => {
    const { formData, setFormData, handleChange, errors, setErrors } = useToolsForm();

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
            {errors.name && errors.name._errors.map((error, index) => (
                <p key={index} className=" text-sm text-red-600 ml-2 mt-2">{error}</p>
            ))}

        </div>
    )
}

export const ToolModel = ({ className = "" }) => {
    const { formData, setFormData, handleChange, errors, setErrors } = useToolsForm();
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
            {errors.model && errors.model._errors.map((error, index) => (
                <p key={index} className=" text-sm text-red-600 ml-2 mt-2">{error}</p>
            ))}
        </div>
    );
}

export const ToolDescription = ({ className = "" }) => {
    const { formData, setFormData, handleChange, errors, setErrors } = useToolsForm();
    return (
        <div className={className}>
            <Textarea
                name="description"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                value={formData.description || ""}
                labelPlacement="inside"
                className="dark"
                placeholder="Descripción" />
            <div>
                {errors.description && errors.description._errors.map((error, index) => (
                    <p key={index} className=" text-sm text-red-600 ml-2 mt-2 mb-2">{error}</p>
                ))}

            </div>
        </div>
    )
}

export const ToolCost = ({ className = "" }) => {
    const { formData, setFormData, handleChange, errors, setErrors } = useToolsForm();
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
            {errors.cost && errors.cost._errors.map((error, index) => (
                <p key={index} className=" text-sm text-red-600 ml-2 mt-2">{error}</p>
            ))}
        </div>

    )
}

export const ToolDate = ({ className = "" }) => {
    const { formData, setFormData, handleChange, errors, setErrors } = useToolsForm();
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
            {errors.date && errors.date._errors.map((error, index) => (
                <p key={index} className=" text-sm text-red-600 ml-2 mt-2">{error}</p>
            ))}
        </div>

    )
}

export const ToolSerial = ({ className = "" }) => {
    const { formData, setFormData, handleChange, errors, setErrors } = useToolsForm();
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
            {errors.serial && errors.serial._errors.map((error, index) => (
                <p key={index} className=" text-sm text-red-600 ml-2 mt-2">{error}</p>
            ))}
        </div>
    )
}

export const ToolImage = ({ }) => {
    const { formData, setFormData, imagePreview, setImagePreview, handleImageChange, handleImageRemove } = useToolsForm();
    return (
        <UploadImage
            className='flex flex-col items-center'
            formData={formData}
            setFormData={setFormData}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            handleImageChange={handleImageChange}
            handleImageRemove={handleImageRemove}
        />
    )
}

export const SubmitButton = ({ className = "" }) => {
    return (
        <div className={className}>
            <Button
                type="submit"
                className=" self-end bg-green-700 hover:bg-green-800 transition duration-300 ease-in-out text-white font-bold py-2 px-8 w-full rounded-xl "
            >
                Guardar
            </Button>
        </div>
    )
}

export const ToolStatusDropdown = ({ className = "" }) => {
    const { formData, setFormData, handleDropdownChange, errors, setErrors } = useToolsForm();
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Estado"]));
    const [isStateDropdownOpen, setIsStateDropdownOpen] = React.useState(false);
    React.useEffect(() => {
        console.log("formData actualizado:", formData);
    })
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
                    <DropdownItem key="Estado" >Estado</DropdownItem>
                    <DropdownItem key="Disponible">Disponible</DropdownItem>
                    <DropdownItem key="No disponible">No Disponible</DropdownItem>
                    <DropdownItem key="En reparacion">En Reparación</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <div>
                {errors.status && errors.status._errors.map((error, index) => (
                    <p key={index} className=" text-sm text-red-600 ml-2 mt-2 mb-2">{error}</p>
                ))}
            </div>
        </div>
    );
};

export const ToolsCategoryDropdown = ({ className = "" }) => {
    const { formData, setFormData, handleDropdownChange, errors, setErrors } = useToolsForm();
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Categoría"]));
    const [isStateDropdownOpen, setIsStateDropdownOpen] = React.useState(false);
    const { categories } = useToolsForm();

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
                    <DropdownItem key="category">Categoría</DropdownItem>
                    {categories.map((category) => (
                        <DropdownItem key={category.name}>{category.name}</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
            <div>
                {errors.category && errors.category._errors.map((error, index) => (
                    <p key={index} className=" text-sm text-red-600 ml-2 mt-2 mb-2">{error}</p>
                ))}
            </div>
        </div>
    )
}

export const ToolsProviderDropdown = ({ className = "" }) => {
    const { formData, setFormData, handleDropdownChange, errors, setErrors } = useToolsForm();
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Proveedorador"]));
    const [isStateDropdownOpen, setIsStateDropdownOpen] = React.useState(false);
    const { providers } = useToolsForm();

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
                    <DropdownItem key="provider">Proveedorador</DropdownItem>
                    {providers.map((provider) => (
                        <DropdownItem key={provider.name}>{provider.name}</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
            <div>
                {errors.provider && errors.provider._errors.map((error, index) => (
                    <p key={index} className=" text-sm text-red-600 ml-2 mt-2 mb-2">{error}</p>
                ))}
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
                            <div>
                                {errors.notes && errors.notes._errors.map((error, index) => (
                                    <p key={index} className="text-sm text-red-600 ml-2 mt-2 mb-2">
                                        {error}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-5 items-center mt-5 sm:mt-8">
                            <ToolStartMaintenanceDate className="w-full sm:w-1/2" />
                            <ToolExpectedRecoveryDate className="w-full sm:w-1/2" />
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
            {
                errors.recoveryDate && errors.recoveryDate._errors.map((error, index) => (
                    <p key={index} className=" text-sm text-red-600 ml-2 mt-2 mb-2">{error}</p>
                ))
            }
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
            {
                errors.startMaintenanceDate && errors.startMaintenanceDate._errors.map((error, index) => (
                    <p key={index} className=" text-sm text-red-600 ml-2 mt-2 mb-2">{error}</p>
                ))
            }
        </div>
    )
}







