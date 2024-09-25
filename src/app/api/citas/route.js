import { NextResponse } from "next/server";
import apiErrorWrapper from "/errors/apiErrorWrapper";


export const GET = apiErrorWrapper(async function(req) {

    console.log(req)
    return NextResponse.json({ message: 'Hello from Next.js!' }, { status: 200 })
})

export const POST = apiErrorWrapper(async function(req) {

})