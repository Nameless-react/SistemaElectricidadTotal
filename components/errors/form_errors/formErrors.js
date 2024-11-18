import { useEffect } from "react";

/**
 * Component that displays validation errors for a form field from the client side.
 *
 * @param {{ errors: object, errorName: string }} props - The props object containing all errors and the specific error name to display.
 * @returns {JSX.Element} A JSX element displaying the error messages for the specified field.
 */
export const FormErrorsClient = ({ errors, errorName }) => {

    return (
        <>
            {errors[errorName] && (
                <>
                    {errors[errorName]._errors.some(error =>
                        error === "Required" || error === "Invalid date"
                    ) ? (
                        <p className="text-sm text-red-600 ml-2 mt-2">{`Este campo es requerido`}</p>
                    )
                        : (
                            errors[errorName]._errors.map((error, index) => (
                                <p key={index} className="text-sm text-red-600 ml-2 mt-2">{error}</p>
                            ))
                        )}
                </>
            )}
        </>
    );
};

/**
 * Componente que muestra los errores de validaci n de un formulario provenientes del servidor.
 *
 * @param {{ serverError: object, errorName: string }} props - La props serverError contiene el objeto de error
 *  completo devuelto por el servidor, y errorName es el nombre del campo que se quiere mostrar los errores.
 * @returns {JSX.Element} Un JSX.Element con los errores de validaci n.
 */
export const FormErrorsServer = ({ serverError, errorName }) => {
    return (
        <>
            {serverError?.error?.validation_error?.message?.[errorName] && (
                <>
                    {serverError.error.validation_error.message[errorName]._errors.some(error =>
                        error === "Required" || error === "Invalid date"
                    ) ? (
                        <p className="text-sm text-red-600 ml-2 mt-2">{`El/la ${errorName} es requerido/a`}</p>
                    ) : (
                        serverError.error.validation_error.message[errorName]._errors.map((error, index) => (
                            <p key={index} className="text-sm text-red-600 ml-2 mt-2">{error}</p>
                        ))
                    )}
                </>
            )}
        </>
    );
};

