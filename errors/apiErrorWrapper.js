import { NextResponse } from 'next/server';
import { BadRequestError, NotFoundError } from './errors';

const apiErrorWrapper = (func) => {
    return async (req, res) => {
        try {
            return await func(req, res);
        } catch (error) {
            console.error('Error in API:', error);
            
            if (error instanceof BadRequestError || error instanceof NotFoundError) return NextResponse.json({ message: error.message }, { status: error.statusCode });


            
            return NextResponse.json({ message: 'Internal server error' }, { status: 406 });
        }
    };
};

export default apiErrorWrapper;
