import { NextResponse } from 'next/server';
import { BadRequestError, NotFoundError, ValidationFailureError, DeletionError, ConflictError } from './errors';
import { Sequelize } from 'sequelize';
import convertedZodErrors from './convertedZodErrors';
import logger from '../functions/others/logger';

const apiErrorWrapper = (func) => {
    const knownErrors = [BadRequestError, NotFoundError, DeletionError];
    const databaseKnownErrors = {
        "P0001": ConflictError,
        "P0002": ValidationFailureError

    }
    return async (req, res) => {
        try {
            return await func(req, res);
        } catch (error) {
            logger.error(error);

            if (knownErrors.some(errorType => error instanceof errorType)) return NextResponse.json({ error: error.message }, { status: error.statusCode });
            else if (error instanceof ValidationFailureError) return NextResponse.json({ error: convertedZodErrors(error.error) }, { status: error.statusCode });


            
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
