"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/input";
import React, { useEffect } from "react";
import { Button } from "@nextui-org/button";
import { handleChange } from "../../../../functions/handles/formHandles";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useSignUpForm } from "./context/signUpContext";
import { FormErrorsClient, FormErrorsServer } from "../../../errors/form_errors/formErrors";

/**
 * Component that renders the sign up form.
 *
 * Renders a form with the following fields:
 * - name,
 * - first surname,
 * - second surname (optional),
 * - identification,
 * - email,
 * - phone number,
 * - password,
 * - password confirmation.
 *
 * The form is rendered in one column on small screens and two columns on
 * large screens.
 *
 * @param {{ children: ReactNode }} props - The children of the component.
 * @returns {JSX.Element} - Component that renders the sign up form.
 */
export const SignUpFormContainer = ({ children }) => {
    const { formData, setErrors, setServerErrors, handleSubmit } = useSignUpForm()
    return (
        <form onSubmit={(e) => handleSubmit(e, formData, setErrors, setServerErrors, process.env.NEXT_PUBLIC_URL_SIGNUP, "/")} className="signUpForm ">
            <h1 className="text-5xl font-bold sm:mb-0 mb-10">Registrarse</h1>
            {children}
        </form>
    )
}

/**
 * Component that renders a text field for the user's name.
 *
 * @param {string} [className=''] - CSS class for the container of the field.
 *
 * @returns {JSX.Element} - Component that renders the text field.
 */
export const SignUpName = ({ className = '' }) => {

    const { formData, setFormData, errors, setErrors, serverErrors, setServerErrors, handleChange } = useSignUpForm()
 
    return (
        <div className={className}>
            <Input
                size="lg"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                name="name"
                isClearable type="text" labelPlacement="outside"
                label="Nombre" placeholder="Su nombre"
                className="dark w-full " />
            <FormErrorsClient errors={errors} errorName={"name"} />
            <FormErrorsServer serverError={serverErrors} errorName={"name"} />
        </div>
    )
}


/**
 * Component that renders a text field for the first last name.
 *
 * @param {string} [className=''] - CSS class for the container of the field.
 *
 * @returns {JSX.Element} - Component that renders the text field.
 */
export const SignUpFirstSurName = ({ className = '' }) => {
    const { formData, setFormData, errors, setErrors, handleChange, serverErrors } = useSignUpForm()
    return (
        <div className={className}>
            <Input
                size="lg"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                name="firstSurName"
                isClearable type="text" labelPlacement="outside"
                label="Primer Apellido" placeholder="Su primer apellido"
                className="dark w-full " />
            <FormErrorsClient errors={errors} errorName={"firstSurName"} />
            <FormErrorsServer serverError={serverErrors} errorName={"firstSurName"} />
        </div>
    )
}

/**
 * Component that renders an input for the second surname.
 *
 * @param {{ className?: string }} props - Component properties.
 * @param {string} [props.className=""] - CSS class for the input container.
 * @returns {JSX.Element} - The rendered component.
 */
export const SignUpSecondSurName = ({ className = '' }) => {
    const { formData, setFormData, errors, setErrors, serverErrors, handleChange } = useSignUpForm()
    return (
        <div className={className}>
            <Input
                size="lg"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                name="secondSurName"
                isClearable type="text" labelPlacement="outside"
                label="Segundo Apellido(opcional)" placeholder="Su segundo apellido"
                className="dark w-full " />
            <FormErrorsClient errors={errors} errorName={"secondSurName"} />
            <FormErrorsServer serverError={serverErrors} errorName={"secondSurName"} />
        </div>
    )
}
/**
 * Component that renders an input for the user's identification.
 *
 * @param {{ className?: string }} props - Component properties.
 * @param {string} [props.className=""] - CSS class for the input container.
 * @returns {JSX.Element} - The rendered component.
 */
export const SignUpIdentification = ({ className = '' }) => {
    const { formData, setFormData, errors, setErrors, handleChange, serverErrors } = useSignUpForm()
    return (
        <div className={className}>
            <Input
                size="lg"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                name="identification"
                isClearable type="text" labelPlacement="outside"
                label="Identificación" placeholder="Su identificación"
                className="dark w-full " />
            <FormErrorsClient errors={errors} errorName={"identification"} />
            <FormErrorsServer serverError={serverErrors} errorName={"identification"} />
        </div>
    )
}

/**
 * Component that renders an input for the email.
 *
 * @param {{ className?: string }} props - Component properties.
 * @param {string} [props.className=""] - CSS class for the input container.
 * @returns {JSX.Element} - The rendered component.
 */
export const SignUpEmail = ({ className = '' }) => {
    const { formData, setFormData, errors, setErrors, handleChange, serverErrors } = useSignUpForm()
    return (
        <div className={className}>
            <Input
                size="lg"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                name="email"
                isClearable type="email" labelPlacement="outside"
                label="Correo" placeholder="Su correo"
                className="dark w-full " />
            <FormErrorsClient errors={errors} errorName={"email"} />
            <FormErrorsServer serverError={serverErrors} errorName={"email"} />
        </div>
    )
}

/**
 * Component that renders an input for the telephone number.
 *
 * @param {{ className?: string }} props - Component properties.
 * @param {string} [props.className=""] - CSS class for the input container.
 * @returns {JSX.Element} - The rendered component.
 */
export const SignUpNumber = ({ className = '' }) => {
    const { formData, setFormData, errors, setErrors, handleChange, serverErrors } = useSignUpForm()
    return (
        <div className={className}>
            <Input
                size="lg"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                name="number"
                isClearable type="text" labelPlacement="outside"
                label="Numero de Telefono" placeholder="Su numero de Telefono"
                className="dark w-full " />
            <FormErrorsClient errors={errors} errorName={"number"} />
            <FormErrorsServer serverError={serverErrors} errorName={"number"} />
        </div>
    )
}

/**
 * Component that renders an input for the user's password.
 *
 * @param {{ className?: string }} props - Component properties.
 * @param {string} [props.className=""] - CSS class for the input container.
 *
 * @returns {JSX.Element} - The rendered component.
 */
export const SignUpPassword = ({ className = '' }) => {
    const { formData, setFormData, errors, setErrors, handleChange, toggleVisibility, isVisible, serverErrors } = useSignUpForm()
    return (
        <div className="w-full sm:mb-0 mb-4">
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

/**
 * Component that renders an input for the user's password confirmation.
 *
 * @param {{ className?: string }} props - Component properties.
 * @param {string} [props.className=""] - CSS class for the input container.
 *
 * @returns {JSX.Element} - The rendered component.
 */
export const SignUpConfirmPassword = ({ className = '' }) => {
    const { formData, setFormData, errors, setErrors, handleChange, toggleVisibility, isVisible, serverErrors } = useSignUpForm()
    return (
        <div className="w-full sm:mb-0 mb-4">
            <Input
                size="lg"
                name="confirmPassword"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                labelPlacement="outside"
                label="Confirmar Contraseña"
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
            <FormErrorsClient errors={errors} errorName={"confirmPassword"} />
            <FormErrorsServer serverError={serverErrors} errorName={"confirmPassword"} />
        </div>
    )
}




