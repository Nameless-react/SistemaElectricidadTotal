export const handleSubmit = async (e, id = null, formData, setErrors, setServerError, urlFetch, urlRedirect,validateDataFunction, router) => {
    e.preventDefault();
    console.log("entra");
    console.log(formData);
    const { success: formSuccess, error: formErrors, data: cleanData } = validateDataFunction(formData);
 
    if (!formSuccess) {
        console.log(formErrors)
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
            console.log("hola response OK")
            setErrors([]);
            const data = await response.json();
            router.push(`${urlRedirect}${id ? `?updateSuccess=true` : '?createSuccess=true'}`);

        } else {
            console.log("hola error")
            const error = await response.json();
            //console.error(error);
            setServerError(error);
        }
    } catch (error) {
        console.error(error);
        setServerError(error);
    }
};