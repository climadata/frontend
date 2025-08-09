export interface WeatherData {
  current: CurrentWeather
  forecast: ForecastDay[]
  alerts: WeatherAlert[]
}

export interface CurrentWeather {
  city: string
  country: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  visibility: number
  uvIndex: number
  feelsLike: number
  pressure: number
  sunrise: string
  sunset: string
}

export interface ForecastDay {
  day: string
  high: number
  low: number
  condition: string
  icon: WeatherIconType
  precipitation: number
}

export interface WeatherAlert {
  id: number
  type: AlertType
  title: string
  description: string
  severity: string
  validUntil: string
}

export type WeatherIconType = "sun" | "cloud" | "rain" | "snow" | "storm"
export type AlertType = "warning" | "danger" | "info" | "success"
