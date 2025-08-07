import type { WeatherData } from "@/types/weather"

export const mockWeatherData: WeatherData = {
  current: {
    city: "São Paulo",
    country: "Brasil",
    temperature: 24,
    condition: "Parcialmente nublado",
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    uvIndex: 6,
    feelsLike: 26,
    pressure: 1013,
    sunrise: "06:15",
    sunset: "18:45",
  },
  forecast: [
    { day: "Hoje", high: 26, low: 18, condition: "Parcialmente nublado", icon: "cloud", precipitation: 20 },
    { day: "Amanhã", high: 28, low: 20, condition: "Ensolarado", icon: "sun", precipitation: 5 },
    { day: "Quinta", high: 22, low: 16, condition: "Chuva", icon: "rain", precipitation: 85 },
    { day: "Sexta", high: 25, low: 19, condition: "Nublado", icon: "cloud", precipitation: 30 },
    { day: "Sábado", high: 29, low: 21, condition: "Ensolarado", icon: "sun", precipitation: 10 },
  ],
  alerts: [
    {
      id: 1,
      type: "warning",
      title: "Alerta de Chuva Forte",
      description: "Possibilidade de chuva intensa entre 14h e 18h. Evite áreas alagáveis.",
      severity: "Moderado",
      validUntil: "18:00",
    },
    {
      id: 2,
      type: "info",
      title: "Qualidade do Ar",
      description: "Qualidade do ar moderada. Pessoas sensíveis devem evitar atividades ao ar livre prolongadas.",
      severity: "Baixo",
      validUntil: "23:59",
    },
  ],
}
