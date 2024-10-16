export const FormErrorsClient = ({ errors, errorName }) => {
    return (
        <>
            {errors[errorName] && (
                <>
                    {errors[errorName]._errors.some(error =>
                        error === "Required" || error === "Invalid date"
                    ) ? (
                        <p className="text-sm text-red-600 ml-2 mt-2">{`El ${errorName} es requerido`}</p>
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

