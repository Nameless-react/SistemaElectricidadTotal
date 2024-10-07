
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useSignIn } from "./context/signInContext"
import { FormErrorsClient } from "../../../errors/form_errors/formErrors";
import { FormErrorsServer } from "../../../errors/form_errors/formErrors";
/**
 * Component that renders the sign in form.
 *
 * Renders a form with the following fields:
 * - email,
 * - password.
 *
 * The form is rendered in one column on small screens and two columns on
 * large screens.
 *
 * @param {{ children: ReactNode }} props - The children of the component.
 * @returns {JSX.Element} - Component that renders the sign in form.
 */
export const SignInFormContainer = ({ children }) => {
    const { formData, setErrors, setServerErrors, handleSubmit } = useSignIn();
    return (
        <form onSubmit={(e) => handleSubmit (e, formData, setErrors, setServerErrors, "/")} className="signInForm">
            <h2 className="text-5xl font-bold">Iniciar Sesión</h2>
            {children}
        </form>
    )
}
/**
 * Component that renders an input for the email.
 *
 * @param {{ className?: string }} props - Component properties.
 * @param {string} [props.className=""] - CSS class for the input container.
 *
 * @returns {JSX.Element} - The rendered component.
 */
export const SignInEmail = ({ className = "" }) => {
    const { formData, setErrors, serverErrors, setServerErrors, errors, setFormData, handleChange } = useSignIn()

    return (
        <div className={className}>
            <Input
                size="lg"
                isClearable
                type="email"
                name="email"
                labelPlacement="outside"
                placeholder="Su correo"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                label="Correo"
                className="dark w-full" />
            <FormErrorsClient errors={errors} errorName={"email"} />
            <FormErrorsServer serverError={serverErrors} errorName={"email"} />
        </div>
    )
}

/**
 * Component that renders an input for the password.
 *
 * @param {{ className?: string }} props - Component properties.
 * @param {string} [props.className=""] - CSS class for the input container.
 *
 * @returns {JSX.Element} - The rendered component.
 */
export const SignInPassword = ({ className = "" }) => {
    const { formData, setErrors, serverErrors, setServerErrors, errors, setFormData, handleChange, isVisible, toggleVisibility } = useSignIn()
    return (
        <div className={className}>
            <Input
                size="lg"
                label="Contraseña"
                name="password"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                labelPlacement="outside"
                placeholder="Su contraseña"
                endContent={
                    <button className="focus:outline-none mb-14" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                        {isVisible ? (
                            <FontAwesomeIcon icon={faEye} className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <FontAwesomeIcon icon={faEyeSlash} className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
                }
                type={isVisible ? "text" : "password"}
                className="w-full dark"
            />
           <FormErrorsClient errors={errors} errorName={"password"} />
           <FormErrorsServer serverError={serverErrors} errorName={"password"} />
        </div>
    )
}

