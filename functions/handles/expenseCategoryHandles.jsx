import { validateExpenseCategoryForm } from "../validations/expenseCategoryValidation";

export const handleDelete = async (id, urlTofetch, urltoRedirect) => {
   
    try {
        const response = await fetch(`${urlTofetch}/${id}`, {
            method: 'PUT', 
        });

        if (!response.ok) {
            throw new Error('Error al eliminar la categoria de gasto');
        }
        const data = await response.json();
        window.location.href = `${urltoRedirect}?deleteSuccess=true`;
    } catch (error) {
        console.error(error);
        alert("Error al inactivar");
    }
}

export const handleSubmit = async (e, id = null, formData, setErrors, setServerError, urlFetch, urlRedirect, router) => {
    e.preventDefault();

    const { success: formSuccess, error: formErrors, data: cleanData } = validateExpenseCategoryForm(formData);

    console.log(cleanData);
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