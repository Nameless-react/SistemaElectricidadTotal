import { validateMaterialsForm } from "../validations/materialsValidtion";

export const handleDelete = async (id, router) => {

    try {
        const response = await fetch(`/api/inventory/tools/tool/delete?id=${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el equipo');
        }
        const data = await response.json();
        window.location.href = '/gestion-inventario/equipos?deleteSuccess=true';

    } catch (error) {
        console.log(error);
        alert("Error al eliminar el equipo");
    }

};

export const handleSubmit = async (e, id = null, formData, setErrors, setServerError, urlFetch, urlRedirect, router) => {
    e.preventDefault();

    const { success: formSuccess, error: formErrors } = validateMaterialsForm(formData);

    if (!formSuccess) {
        setErrors(formErrors);
        return;
    }

    try {
        const response = await fetch(urlFetch, {
            method: id ? 'PUT' : 'POST',
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            router.push(`${urlRedirect}${id ? `?updateSuccess=true` : '?createSuccess=true'}`);
        } else {
            const error = await response.json();
            //console.error(error);
            setServerError(error);
        }
    } catch (error) {
        //console.log(error);
        setServerError(error);
    }
}
