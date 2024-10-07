
import { signIn } from "next-auth/react";
import { validateSignIn } from "../validations/signInValidation";

/**
 * Handles the form submission for the sign in form.
 *
 * @param {Event} e - The event object of the form submission.
 * @param {Object} formData - The form data as an object.
 * @param {Function} setErrors - The function to update the errors state.
 * @param {Function} setServerError - The function to update the server errors state.
 * @param {string} urlRedirect - The URL to redirect the user to if the form is valid.
 */


export const handleSubmit = async (e, formData, setErrors, setServerError, urlRedirect) => {
    e.preventDefault();

    const { success: formSuccess, error: formErrors, data: validatedData } = validateSignIn(formData);
    console.log(formErrors, "formErrors");


    if (!formSuccess) {
        setErrors(formErrors);
        return;
    }

    try {
        const res = await signIn("credentials", {
            redirect: false,
            email: validatedData.email,
            password: validatedData.password,
        });

        if (!res.ok) {
            const error = await res.json();
            console.error('Server Error:', error);
            setServerError(error);
            return; // Exit early if there's a server error
        } else {
            window.location.href = urlRedirect;
        }

    } catch (error) {
        console.error('Fetch Error:', error);
        setServerError({ message: 'An unexpected error occurred. Please try again later.' });
    }
};