import { NextResponse } from 'next/server';
import { BadRequestError, NotFoundError, ValidationFailureError, DatabaseDeletionError, ConflictError } from './errors';
import { Sequelize } from 'sequelize';

const apiErrorWrapper = (func) => {
    const knownErrors = [BadRequestError, NotFoundError, DatabaseDeletionError];
    const databaseKnownErrors = {
        "P0001": ConflictError,

    }
    return async (req, res) => {
        try {
            return await func(req, res);
        } catch (error) {
            console.error('Error in API:', error);

            if (knownErrors.some(errorType => error instanceof errorType)) return NextResponse.json({ error: error.message }, { status: error.statusCode });
            else if (error instanceof ValidationFailureError) return NextResponse.json({ error: JSON.parse(error.message) }, { status: error.statusCode });

            if (error instanceof Sequelize.DatabaseError) {
                if (databaseKnownErrors[error?.original.code]) {
                    const databaseError = new databaseKnownErrors[error?.original.code](error.original);
                    return NextResponse.json({ error: databaseError.message.split(": ")[1] }, { status: databaseError.statusCode });
                }
            }
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    };
};

export default apiErrorWrapper;
