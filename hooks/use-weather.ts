"use client"

import { useState } from "react"
import type { WeatherData } from "@/types/weather"

export function useWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchWeather = async (city: string) => {
    if (!city.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      if (!response.ok) throw new Error("Erro na resposta da API")
      const data: WeatherData = await response.json()
      setWeatherData(data)
    } catch (err) {
      setError("Erro ao buscar dados meteorológicos: " + (err as Error).message)
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    weatherData,
    isLoading,
    error,
    searchWeather,
  }
}