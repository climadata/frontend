import { NextRequest, NextResponse } from "next/server";
import { API_CONFIG } from "@/lib/api-config";
import { mockWeatherData } from "@/data/weather-data";

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get("city");
  if (!city) {
    return NextResponse.json({ error: "Cidade não informada" }, { status: 400 });
  }

  try {
    const gatewayUrl = API_CONFIG.WEATHER.GET_CITY(city);
    const response = await fetch(gatewayUrl, { 
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Gateway error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching weather data from gateway:', error);
    
    // Retorna erro quando o serviço não está disponível
    return NextResponse.json(
      { 
        error: "Erro ao buscar dados meteorológicos",
        message: error instanceof Error ? error.message : "Serviço temporariamente indisponível"
      }, 
      { status: 503 }
    );
  }
}
