
import { validateFormTools, validateFormToolsMaintenance } from "../validations/toolsValidation";

export const handleChange = (event, setFormData, setErrors, errors) => {
    setFormData((prevFormData) => ({
        ...prevFormData,
        [event.target.name]: event.target.value
    }));

    const updatedErrors = { ...errors };
    delete updatedErrors[event.target.name];
    setErrors(updatedErrors);
}

export const handleDropdownChange = (keys, setSelectedKeys, setFormData, atribute, errors, setErrors) => {
    const newKeys = new Set(keys);
    setSelectedKeys(newKeys);
    const newValue = Array.from(newKeys)[0];
    setFormData(prevData => ({
        ...prevData,
        [atribute]: newValue
    }));
    const updatedErrors = { ...errors };
    delete updatedErrors[atribute];
    setErrors(updatedErrors);
};

export const handleImageChange = (e, formData, setFormData, setImagePreview) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
            setFormData({ ...formData, image: selectedFile });
        }
        reader.readAsDataURL(selectedFile);
    } else {
        setFormData({ ...formData, image: formData.image });
    }
}

export const handleImageRemove = (formData, setFormData, setImagePreview) => {
    setImagePreview(null);
    setFormData({ ...formData, image: null });
    setImagePreview(null);
}

export const handleSubmitCreate = async (e, formData, setErrors, setServerError, isChecked) => {
    e.preventDefault();
    setErrors([]);


    const { success: formSuccess, error: formErrors } = validateFormTools(formData);

    if (!formSuccess) {
        setErrors(formErrors);
        return;
    }

    if (isChecked) {

        const { success: maintenanceSuccess, error: maintenanceErrors } = validateFormToolsMaintenance(formData);
        if (!maintenanceSuccess) {
            setErrors(maintenanceErrors);
            return;
        }
    }

    const formToSend = new FormData();
    for (const key in formData) {
        formToSend.append(key, formData[key]);
    }

    try {

        const response = await fetch('/api/inventory/tools/tool/create', {
            method: 'POST',
            body: formToSend
        });

        if (response.ok) {
            setServerError(null);
            const data = await response.json();
            console.log(data);
        } else {
            const error = await response.json();
            console.error(error);
            setServerError(error);
        }
    } catch (error) {
        console.error(error);
        setServerError(error);
    }
};

