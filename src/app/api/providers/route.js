import { NextResponse } from "next/server";
import ProviderController from "../../../../controllers/provider.controller";

const providerController = new ProviderController();

export async function GET(req) {
    try {
        const providers = await providerController.getProviders();

        if (!providers) {
            return NextResponse.json({ message: 'Providers not found' }, { status: 404 });
        }

        return NextResponse.json(providers, { status: 200 });

    } catch (error) {
        console.error('Error while getting providers:', error);
        return NextResponse.json({ message: 'Error while getting providers' }, { status: 500 });
    }
}