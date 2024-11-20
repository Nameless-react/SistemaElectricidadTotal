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

export const handleSubmit = async (e, id = null, formData, setErrors, setServerError, urlFetch, urlRedirect,validateDataFunction, router) => {
    e.preventDefault();
 
    const { success: formSuccess, error: formErrors, data: cleanData } = validateDataFunction(formData);
   
    if (!formSuccess) {
        setErrors(formErrors);
        return;
    }
 
    try {
        const response = await fetch(urlFetch, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: id ? 'PUT' : 'POST',
            body: JSON.stringify(cleanData),
        });

        if (response.ok) {
            setErrors([]);
    
            const data = await response.json();
            router.push(`${urlRedirect}${id ? `?updateSuccess=true` : '?createSuccess=true'}`);
        } else {

            const error = await response.json();
            //console.error(error);
            setServerError(error);
        }
    } catch (error) {
        console.error(error);
        setServerError(error);
    }
};

export const handleDelete = async (id, urlToFetch, urlToRedirect, setServerError) => {
    try {
        const response = await fetch(`${urlToFetch}?id=${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const data = await response.json();
            window.location.href = `${urlToRedirect}?deleteSuccess=true`;

        } else {
            const data = await response.json();
            setServerError(data);
        }

    } catch (error) {
        //console.log(error);
        alert("Error al eliminar");
    }

};


