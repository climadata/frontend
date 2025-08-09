import { NextRequest, NextResponse } from "next/server";
import { API_CONFIG } from "@/lib/api-config";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  
  if (!userId) {
    return NextResponse.json({ error: "ID do usuário é obrigatório" }, { status: 400 });
  }

  try {
    const gatewayUrl = API_CONFIG.ALERTS.GET_USER(userId);
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
    console.error('Error fetching alerts:', error);
    return NextResponse.json(
      { 
        error: "Erro ao buscar alertas",
        message: error instanceof Error ? error.message : "Erro desconhecido"
      }, 
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, type, title, description, severity } = body;

    if (!userId || !type || !title || !description || !severity) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" }, 
        { status: 400 }
      );
    }

    const gatewayUrl = API_CONFIG.ALERTS.CREATE;
    const response = await fetch(gatewayUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, type, title, description, severity }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { 
          error: "Erro ao criar alerta",
          message: errorData.message || "Não foi possível criar o alerta"
        }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating alert:', error);
    return NextResponse.json(
      { 
        error: "Erro interno do servidor",
        message: error instanceof Error ? error.message : "Erro desconhecido"
      }, 
      { status: 500 }
    );
  }
}
