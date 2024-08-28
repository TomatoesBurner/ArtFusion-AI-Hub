// src/app/api/auth/token/route.ts
export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    // Simulate a successful response with a dummy token
    return new Response(
      JSON.stringify({
        access_token: "dummy_access_token",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
