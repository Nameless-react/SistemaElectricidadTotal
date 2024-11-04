
import { validateFormTools, validateFormToolsMaintenance } from "../validations/toolsValidation";


export const handleSubmit = async (e, id = null, formData, setErrors, setServerError, isChecked = false, urlFetch, urlRedirect, router) => {
    e.preventDefault();

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
        const response = await fetch(urlFetch, {
            method: id ? 'PUT' : 'POST',
            body: formToSend
        });

        if (response.ok) {

            setErrors([]);
            const data = await response.json();
            //router.push(`${urlRedirect}${id ? `?updateSuccess=true` : '?createSuccess=true'}`);
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



