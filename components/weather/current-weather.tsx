import { MapPin, Sunrise, Sunset } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WeatherIcon } from "./weather-icon"
import type { CurrentWeather } from "@/types/weather"

interface CurrentWeatherProps {
  weather: CurrentWeather
}

export function CurrentWeatherCard({ weather }: CurrentWeatherProps) {
  return (
    <Card className="xl:col-span-2 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-white text-xl">
          <MapPin className="h-6 w-6 text-blue-400" />
          {weather.city}, {weather.country}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="text-8xl md:text-9xl font-bold bg-gradient-to-br from-white to-blue-200 bg-clip-text text-transparent">
              {weather.temperature}°
            </div>
            <div className="text-2xl text-white/90 font-medium">{weather.condition}</div>
            <div className="text-lg text-white/60">
              Sensação térmica: <span className="text-white/80 font-semibold">{weather.feelsLike}°C</span>
            </div>
          </div>
          <div className="transform hover:scale-110 transition-transform duration-300">
            <WeatherIcon condition="cloud" size={120} />
          </div>
        </div>

        {/* Sol e Lua */}
        <div className="flex items-center justify-between pt-6 border-t border-white/20">
          <div className="flex items-center gap-3">
            <Sunrise className="h-6 w-6 text-amber-400" />
            <div>
              <div className="text-white/60 text-sm">Nascer do sol</div>
              <div className="text-white font-semibold">{weather.sunrise}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Sunset className="h-6 w-6 text-orange-400" />
            <div>
              <div className="text-white/60 text-sm">Pôr do sol</div>
              <div className="text-white font-semibold">{weather.sunset}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
