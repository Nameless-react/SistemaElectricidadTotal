import { NextResponse } from 'next/server'
import { getPusherInstance }  from '/functions/others/pusher/pusherServer';
const pusherServer = getPusherInstance();

export async function POST(req, res) {
    const parseBody = await req.json();
    try {
        await pusherServer.trigger(
            'private-chat',
            "evt::test",
            {
                message: parseBody.message,
                user: "ree",
                date: new Date(),
            }
        )

        return NextResponse.json({ message: "Prbando sockets" }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Fallo en los sockets", error: error }, { status: 500 })
    }
}