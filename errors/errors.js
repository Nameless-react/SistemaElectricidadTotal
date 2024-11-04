export class SQLError extends Error {
    constructor(message = 'Error en la base de datos', details = null) {
        super(message);
        this.name = 'SQLError';
        this.details = details;
        this.statusCode = 500;
    }
}


export class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequestError';
        this.statusCode = 400;
    }
}

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

export class ValidationFailureError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
        this.name = "ValidationFailureError" 
        this.error = message
    }
}

export class DeletionError extends SQLError {
    constructor(message = 'Error al eliminar el recurso', details = null) {
        super(message, details);
        this.statusCode = 400;
        this.name = "DatabaseDeletionError";
    }
}

export class ConflictError extends SQLError {

    constructor(message = "Conflicto con el estado actual del recurso", details = null) {
        super(message, details);
        this.statusCode = 409;
        this.name = "ConflictError"
    }
}

export class ErrorHandler {
    sendError(res, message, error = 'GeneralError', status = 500) {
        const errorResponse = {
            error: {
                [error]: {
                    message
                }
            }
        };

        return res.json(errorResponse, { status });
    }
}
