import { NextResponse } from "next/server"
import { createMaterialController } from "../../../../../../controllers/factory";


/**
 * Handles a POST request to save a material.
 * @param {NextApiRequest} request The Next.js request object.
 * @returns {Promise<NextApiResponse>} A promise that resolves to a Next.js response object.
 * @throws {Error} If an error occurs while trying to save the material.
 */
export async function POST(request) {

    const materialController = createMaterialController();
    try {
        const result = await materialController.saveMaterial(request, NextResponse);
        return result;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


/**
 * Handles a PUT request to update a material.
 * @param {NextApiRequest} request The Next.js request object.
 * @returns {Promise<NextApiResponse>} A promise that resolves to a Next.js response object.
 * @throws {Error} If an error occurs while trying to update the material.
 */
export async function PUT(request) {

    const materialController = createMaterialController();
    try {

        const result = await materialController.updateMaterial(request, NextResponse);
        return result

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/**
 * Handles a DELETE request to delete a material.
 * @param {NextApiRequest} request The Next.js request object.
 * @returns {Promise<NextApiResponse>} A promise that resolves to a Next.js response object.
 * @throws {Error} If an error occurs while trying to delete the material.
 */
export async function DELETE(request) {

    const materialController = createMaterialController();

    try {

        const result = materialController.deleteMaterial(request, NextResponse);
        return result;

    } catch (error) {
        console.error('Error processing the request:', error);
        return NextResponse.json({ error: "Error processing the request" }, { status: 500 });
    }
}

