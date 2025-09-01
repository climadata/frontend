// app/api/weather/route.ts
import { NextRequest, NextResponse } from "next/server";

const GATEWAY_BASE =
  process.env.GATEWAY_URL ?? "http://api-gateway:3000/api";

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get("city")?.trim();
  if (!city) {
    return NextResponse.json({ error: "Cidade não informada" }, { status: 400 });
  }

  const url = `${GATEWAY_BASE}/weather?city=${encodeURIComponent(city)}`;

  try {
    const r = await fetch(url, { cache: "no-store" });
    const contentType = r.headers.get("content-type") ?? "";
    const body = contentType.includes("application/json")
      ? await r.json()
      : await r.text();

    if (!r.ok) {
      return NextResponse.json(
        { error: "Gateway error", status: r.status, details: body },
        { status: r.status }
      );
    }

    return NextResponse.json(body, { status: r.status });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("[api/weather] proxy failed:", message);
    return NextResponse.json(
      { error: "Erro ao buscar dados meteorológicos", message },
      { status: 503 }
    );
  }
}