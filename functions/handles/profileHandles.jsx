import { validateProfileUpdate } from "../validations/profileValidation";

export const handleSubmit = async (e, formData, setErrors, setServerErrors, urltoFetch) => {
    e.preventDefault();
    try {
        const { success, data, error } = validateProfileUpdate(formData);
        if (!success) {
            setErrors(error);
            return;
        }

        const response = await fetch(urltoFetch, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (response.ok) {
            const result = await response.json();
            window.location.reload();
        } else {
            const error = await response.json();
            setServerErrors(error);
            return;
        }

    } catch (error) {
        console.log(error);
        setServerErrors(error);
    }
}