import { validateUser } from "../validations/userValidation";
export const handleSubmit = async (e, formData, setErrors, setServerError, urlFetch, urlRedirect) => {
    e.preventDefault();

    const { success: formSuccess, error: formErrors, data: validatedData } = validateUser(formData);
    if (!formSuccess) {
        setErrors(formErrors);
        return;
    }

    try {
        const response = await fetch(urlFetch, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(validatedData),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Server Error:', error);
            setServerError(error);
            return; // Exit early if there's a server error
        }

        const result = await response.json(); // Expect a JSON response
        console.log('Response:', result);

        // Optionally redirect or perform further actions here
        if (urlRedirect) {
            // Example: Redirect after successful registration
            //window.location.href = urlRedirect;
        }

    } catch (error) {
        console.error('Fetch Error:', error);
        setServerError({ message: 'An unexpected error occurred. Please try again later.' });
    }
};