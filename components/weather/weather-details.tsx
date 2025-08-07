import { Droplets, Wind, Eye, Sun, Gauge } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CurrentWeather } from "@/types/weather"

interface WeatherDetailsProps {
  weather: CurrentWeather
}

export function WeatherDetails({ weather }: WeatherDetailsProps) {
  const details = [
    {
      icon: Droplets,
      label: "Umidade",
      value: `${weather.humidity}%`,
      color: "text-blue-400",
    },
    {
      icon: Wind,
      label: "Vento",
      value: `${weather.windSpeed} km/h`,
      color: "text-slate-400",
    },
    {
      icon: Eye,
      label: "Visibilidade",
      value: `${weather.visibility} km`,
      color: "text-emerald-400",
    },
    {
      icon: Sun,
      label: "Índice UV",
      value: weather.uvIndex.toString(),
      color: "text-amber-400",
    },
    {
      icon: Gauge,
      label: "Pressão",
      value: `${weather.pressure} hPa`,
      color: "text-purple-400",
    },
  ]

  return (
    <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500">
      <CardHeader>
        <CardTitle className="text-white text-xl">Detalhes do Clima</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {details.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <item.icon className={`h-5 w-5 ${item.color}`} />
              <span className="text-white/80 font-medium">{item.label}</span>
            </div>
            <span className="text-white font-bold text-lg">{item.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
