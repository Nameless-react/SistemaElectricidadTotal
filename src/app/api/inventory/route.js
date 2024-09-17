

export async function GET(request) {
    return new Response(JSON.stringify({ message: "Hello from Next.js API with App Router!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }