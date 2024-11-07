import React, { useEffect } from 'react'
import { Input, Textarea } from "@nextui-org/input";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useToolsForm } from "../context/toolsFormContext";
import { Checkbox } from '@nextui-org/checkbox';
import { UploadImage } from '../../../../images/formImages';
import { FormErrorsClient, FormErrorsServer } from '../../../../errors/form_errors/formErrors';
/**
 * A form component to create or edit a tool.
 * 
 * @param {Object} props Component props.
 * @param {string} [props.className=""] The class name of the component.
 * @param {React.ReactNode} [props.children=null] The children of the component.
 * @returns {React.ReactElement} A react component that renders the form with the children inside.
 * @example
 * import { ToolForm } from '../../components/inventory/tools/compoundComponents/tools/toolForm';
 * 
 * const MyToolForm = () => {
 *     return (
 *         <ToolForm>
 *             <ToolName />
 *             <ToolModel />
 *             <ToolDescription />
 *             <ToolCost />
 *         </ToolForm>
 *     )
 * }
 */
export const ToolForm = ({ className = "", children }) => {
    const { handleSubmit, formData, setErrors, setServerError, isChecked, setIsChecked, id, router, serverError } = useToolsForm();
     
    return (
        <div className={className}>
            <form
                onSubmit={id
                    ? (e) => handleSubmit(e, id, formData, setErrors, setServerError, isChecked, `${process.env.NEXT_PUBLIC_URL_TOOLS_Tool}?id=${id}`, process.env.NEXT_PUBLIC_URL_TOOLS, router)
                    : (e) => handleSubmit(e, id, formData, setErrors, setServerError, isChecked, process.env.NEXT_PUBLIC_URL_TOOLS_Tool, process.env.NEXT_PUBLIC_URL_TOOLS, router)
                }>
                {children}
                {/* {serverError && serverError.error && <p className="text-red-500 text-center mt-4">{serverError.error.internal_server_error.message}</p>} */}
            </form>
        </div>
    )
}
/**
 * A form component to render an input for the tool's name.
 * 
 * @param {Object} props Component props.
 * @param {string} [props.className=""] The class name of the component.
 * @returns {React.ReactElement} A react component that renders the input.
 * @example
 * import { ToolName } from '../../components/inventory/tools/compoundComponents/tools/toolForm';
 * 
 * const MyToolName = () => {
 *     return (
 *         <ToolName />
 *     )
 * }
 */
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

/**
 * A form component to render an input for the tool's model.
 * 
 * @param {Object} props Component props.
 * @param {string} [props.className=""] The class name of the component.
 * @returns {React.ReactElement} A react component that renders the input.
 * @example
 * import { ToolModel } from '../../components/inventory/tools/compoundComponents/tools/toolForm';
 * 
 * const MyToolModel = () => {
 *     return (
 *         <ToolModel />
 *     )
 * }
 */
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

/**
 * A form component to render a textarea for the tool's description.
 * 
 * @param {Object} props Component props.
 * @param {string} [props.className=""] The class name of the component.
 * @returns {React.ReactElement} A react component that renders the textarea.
 * @example
 * import { ToolDescription } from '../../components/inventory/tools/compoundComponents/tools/toolForm';
 * 
 * const MyToolDescription = () => {
 *     return (
 *         <ToolDescription />
 *     )
 * }
 */
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

/**
 * A form component to render an input for the tool's cost.
 * 
 * @param {Object} props Component props.
 * @param {string} [props.className=""] The class name of the component.
 * @returns {React.ReactElement} A react component that renders the input.
 * @example
 * import { ToolCost } from '../../components/inventory/tools/compoundComponents/tools/toolForm';
 * 
 * const MyToolCost = () => {
 *     return (
 *         <ToolCost />
 *     )
 * }
 */

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

/**
 * A form component to render an input for the tool's purchase date.
 * 
 * @param {Object} props Component props.
 * @param {string} [props.className=""] The class name of the component.
 * @returns {React.ReactElement} A react component that renders the input.
 * @example
 * import { ToolDate } from '../../components/inventory/tools/compoundComponents/tools/toolForm';
 * 
 * const MyToolDate = () => {
 *     return (
 *         <ToolDate />
 *     )
 * }
 */
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

/**
 * A form component to render an input for the tool's serial number.
 * 
 * @param {Object} props Component props.
 * @param {string} [props.className=""] The class name of the component.
 * @returns {React.ReactElement} A react component that renders the input.
 * @example
 * import { ToolSerial } from '../../components/inventory/tools/compoundComponents/tools/toolForm';
 * 
 * const MyToolSerial = () => {
 *     return (
 *         <ToolSerial />
 *     )
 * }
 */
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

/**
 * A form component to handle the upload and display of an image for a tool.
 * Integrates with the UploadImage component to manage image changes and previews.
 *
 * @returns {React.ReactElement} A react component that renders the image upload interface.
 * @example
 * import { ToolImage } from '../../components/inventory/tools/compoundComponents/tools/toolForm';
 * 
 * const MyToolImage = () => {
 *     return (
 *         <ToolImage />
 *     )
 * }
 */
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

/**
 * A dropdown component to handle the selection of a tool status.
 * Integrates with the ToolsFormContext to manage form data and validation.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className=""] - The CSS class to be applied to the component.
 * @returns {React.ReactElement} A react component that renders the tool status dropdown interface.
 * @example
 * import { ToolStatusDropdown } from '../../components/inventory/tools/compoundComponents/tools/toolForm';
 *
 * const MyToolStatusDropdown = () => {
 *     return (
 *         <ToolStatusDropdown />
 *     )
 * }
 */
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

/**
 * A dropdown component to handle the selection of a tool category.
 * Integrates with the ToolsFormContext to manage form data and validation.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className=""] - The CSS class to be applied to the component.
 * @returns {React.ReactElement} A react component that renders the tool category dropdown interface.
 * @example
 * import { ToolsCategoryDropdown } from '../../components/inventory/tools/compoundComponents/tools/toolForm';
 *
 * const MyToolsCategoryDropdown = () => {
 *     return (
 *         <ToolsCategoryDropdown />
 *     )
 * }
 */
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

/**
 * A dropdown component to handle the selection of a provider.
 * Integrates with the ToolsFormContext to manage form data and validation.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className=""] - The CSS class to be applied to the component.
 * @returns {React.ReactElement} A react component that renders the provider dropdown interface.
 * @example
 * import { ToolsProviderDropdown } from '../../components/inventory/tools/compoundComponents/tools/toolForm';
 *
 * const MyToolsProviderDropdown = () => {
 *     return (
 *         <ToolsProviderDropdown />
 *     )
 * }
 */
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

/**
 * A checkbox component allowing users to add maintenance notes for tools.
 * 
 * This component integrates with the ToolsFormContext to handle form data related to maintenance notes.
 * It manages the visibility of a textarea for note input based on the tool's status and checkbox state.
 * 
 * The component:
 * - Shows a checkbox and a label asking if the user wants to add maintenance notes.
 * - Displays a textarea for input if the checkbox is checked and the tool's status is "En reparacion".
 * - Handles form data updates for maintenance notes and the checkbox state.
 * 
 * @param {Object} props - The component props.
 * @param {string} [props.className=""] - The CSS class to be applied to the component.
 * @returns {React.ReactElement} A React component that renders the maintenance notes checkbox interface.
 */
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


/**
 * A form component to render an input for the tool's expected recovery date.
 * 
 * @param {Object} props - The component props.
 * @param {string} [props.className=""] - The CSS class to be applied to the component.
 * @returns {React.ReactElement} A react component that renders the expected recovery date input.
 * 
 * @example
 * import { ToolExpectedRecoveryDate } from '../../components/inventory/tools/compoundComponents/tools/toolForm';
 * 
 * const MyToolExpectedRecoveryDate = () => {
 *     return (
 *         <ToolExpectedRecoveryDate />
 *     )
 * }
 */
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

/**
 * A form component to render an input for the tool's start maintenance date.
 * 
 * @param {Object} props - The component props.
 * @param {string} [props.className=""] - The CSS class to be applied to the component.
 * @returns {React.ReactElement} A react component that renders the start maintenance date input.
 * 
 * @example
 * import { ToolStartMaintenanceDate } from '../../components/inventory/tools/compoundComponents/tools/toolForm';
 * 
 * const MyToolStartMaintenanceDate = () => {
 *     return (
 *         <ToolStartMaintenanceDate />
 *     )
 * }
 */
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







