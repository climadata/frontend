import { Sun, Cloud, CloudRain, CloudSnow, Zap } from "lucide-react"
import type { WeatherIconType } from "@/types/weather"

interface WeatherIconProps {
  condition: WeatherIconType
  size?: number
  className?: string
}

export function WeatherIcon({ condition, size = 24, className = "" }: WeatherIconProps) {
  const iconProps = { size }

  const iconMap = {
    sun: <Sun {...iconProps} className={`text-amber-400 drop-shadow-lg ${className}`} />,
    cloud: <Cloud {...iconProps} className={`text-slate-400 drop-shadow-lg ${className}`} />,
    rain: <CloudRain {...iconProps} className={`text-blue-500 drop-shadow-lg ${className}`} />,
    snow: <CloudSnow {...iconProps} className={`text-blue-300 drop-shadow-lg ${className}`} />,
    storm: <Zap {...iconProps} className={`text-purple-500 drop-shadow-lg ${className}`} />,
  }

  return iconMap[condition] || iconMap.sun
}
