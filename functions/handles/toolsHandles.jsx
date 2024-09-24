
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
    if (newValue === "Seleccionar") {
        setFormData(prevData => ({
            ...prevData,
            [atribute]: ""
        }));
    } else {
        setFormData(prevData => ({
            ...prevData,
            [atribute]: newValue
        }));
    }
    const updatedErrors = { ...errors };
    delete updatedErrors[atribute];
    setErrors(updatedErrors);
};

export const handleImageChange = (e, formData, setFormData, setImagePreview, SetErrors, errors) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
        const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (validMimeTypes.includes(selectedFile.type) && selectedFile.size > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
                setFormData({ ...formData, image: selectedFile });
            };
            reader.readAsDataURL(selectedFile);
            const updatedErrors = { ...errors };
            delete updatedErrors.image;
            SetErrors(updatedErrors);
        } else {
            alert("Por favor, selecciona un archivo válido (JPEG, PNG o GIF).");
            setFormData({ ...formData, image: null });
        }
    } else {
        alert("Por favor, selecciona una imagen.");
        setFormData({ ...formData, image: null });
        setImagePreview(null);
    }
};
export const handleImageRemove = (formData, setFormData, setImagePreview) => {
    setImagePreview(null);
    setFormData({ ...formData, image: null });
    setImagePreview(null);
}

export const handleSubmit = async (e, formData, setErrors, setServerError, isChecked, urlFetch) => {
    e.preventDefault();
    setErrors([]);
    setServerError([]);

    const { success: formSuccess, error: formErrors } = validateFormTools(formData);
    console.log(formSuccess, formErrors);

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

        const response = await fetch(urlFetch, {
            method: 'POST',
            body: formToSend
        });

        if (response.ok) {
         
            setErrors([]);
            const data = await response.json();
          
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


