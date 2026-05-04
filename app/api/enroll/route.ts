const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxVgnifto29pzQyKnORYa-UdLoNYuvz3Q2fmwP0UKW0Qf_XwxeZHgEyHB2dBGF88LNP/exec";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sheetName: "Course",
        ...body,
      }),
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false }, { status: 500 });
  }
}