import { Input, Textarea } from "@nextui-org/input"
import { useProfileForm } from "./context/profileFormContext"
import { useEffect } from "react"
import { FormErrorsClient } from "../../errors/form_errors/formErrors";
import { FormErrorsServer } from "../../errors/form_errors/formErrors";
/**
 * Component that renders a form with the given children and a submit handler.
 * The form will be submitted to the "/api/auth/profile" endpoint.
 * If there are any server errors, they will be displayed in a red paragraph.
 * @param {{ children: ReactNode, classNames?: { base: string, form: string } }} props
 * @returns {JSX.Element}
 */
export const ProfileFormContainer = ({ children, classNames = {
    base: "",
    form: "",
} }) => {
    const { formData, setErrors, setServerErrors, serverErrors, handleSubmit } = useProfileForm();
    return (
        <div className={classNames.base}>
            <form
                onSubmit={(e) => handleSubmit(e, formData, setErrors, setServerErrors, "/api/auth/profile")}
                className={classNames.form}>
                {children}
            {serverErrors && serverErrors.error && <p className="text-red-500 text-center mt-4 mb-4">{serverErrors.error.internal_server_error.message}</p>}
            </form>
        </div>
    )
}

export const ProfileFormName = ({ classNames = {
    base: "",
    input: "",
} }) => {
    const { formData, setFormData, errors, setErrors, serverErrors, setServerErrors, handleChange } = useProfileForm();

    return (
        <div className={classNames.base}>
            <Input
                name="name"
                label="Nombre"
                labelPlacement="outside"
                value={formData.name || ""}
                placeholder="Nombre"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                className={classNames.input}
            />
            <FormErrorsClient errorName={"name"} errors={errors} />
            <FormErrorsServer errorName={"name"} serverError={serverErrors} />
        </div>
    )
}

export const ProfileFormFirstSurName = ({ classNames = {
    base: "",
    input: "",
} }) => {
    const { formData, setFormData, errors, setErrors, serverErrors, setServerErrors, handleChange } = useProfileForm();
    return (
        <div className={classNames.base}>
            <Input
                name="firstsurname"
                label="Primer Apellido"
                labelPlacement="outside"
                value={formData.
                    firstsurname
                    || ""}
                placeholder="Primer Apellido"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                className={classNames.input}
            />
            <FormErrorsClient errorName={"firstsurname"} errors={errors} />
            <FormErrorsServer errorName={"firstsurname"} serverError={serverErrors} />
        </div>
    )
}

export const ProfileFormSecondSurName = ({ classNames = {
    base: "",
    input: "",
} }) => {
    const { formData, setFormData, errors, setErrors, serverErrors, setServerErrors, handleChange } = useProfileForm();
    return (
        <div className={classNames.base}>
            <Input
                name="secondsurname"
                value={formData.secondsurname || ""}
                label="Segundo Apellido"
                labelPlacement="outside"
                placeholder="Segundo Apellido"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                className={classNames.input}
            />
            <FormErrorsClient errorName={"secondsurname"} errors={errors} />
            <FormErrorsServer errorName={"secondsurname"} serverError={serverErrors} />
        </div>
    )
}


export const ProfileFormPhone = ({ classNames = {
    base: "",
    input: "",
} }) => {
    const { formData, setFormData, errors, setErrors, serverErrors, setServerErrors, handleChange } = useProfileForm();
    return (
        <div className={classNames.base}>
            <Input
                name="phone"
                value={formData.phone || ""}
                label="Teléfono"
                labelPlacement="outside"
                placeholder="Teléfono"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                className={classNames.input}
            />
            <FormErrorsClient errorName={"phone"} errors={errors} />
            <FormErrorsServer errorName={"phone"} serverError={serverErrors} />
        </div>
    )
}

export const ProfileFormAddress = ({ classNames = {
    base: "",
    input: "",
} }) => {
    const { formData, setFormData, errors, setErrors, serverErrors, setServerErrors, handleChange } = useProfileForm();
    return (
        <div className={classNames.base}>
            <Textarea
                name="address"
                value={formData.address || ""}
                label="Dirección"
                labelPlacement="outside"
                placeholder="Dirección"
                onChange={(e) => handleChange(e, setFormData, setErrors, errors)}
                className={classNames.input}
            />
        </div>
    )
}