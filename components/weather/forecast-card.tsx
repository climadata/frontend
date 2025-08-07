import { Cloud, Droplets } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WeatherIcon } from "./weather-icon"
import type { ForecastDay } from "@/types/weather"

interface ForecastCardProps {
  forecast: ForecastDay[]
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white text-2xl flex items-center gap-3">
          <Cloud className="h-7 w-7 text-blue-400" />
          Previsão dos Próximos Dias
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {forecast.map((day, index) => (
            <div
              key={index}
              className="group text-center p-6 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="font-bold text-white text-lg mb-3">{day.day}</div>
              <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <WeatherIcon condition={day.icon} size={48} />
              </div>
              <div className="text-white/70 mb-3 font-medium">{day.condition}</div>
              <div className="flex justify-center gap-3 mb-3">
                <span className="text-white font-bold text-xl">{day.high}°</span>
                <span className="text-white/50 text-lg">{day.low}°</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <Droplets className="h-4 w-4 text-blue-400" />
                <span className="text-white/70">{day.precipitation}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
