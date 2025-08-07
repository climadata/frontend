"use client"

import { useState } from "react"
import type { WeatherData } from "@/types/weather"
import { mockWeatherData } from "@/data/weather-data"

export function useWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData>(mockWeatherData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchWeather = async (city: string) => {
    if (!city.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      // Simular chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Aqui você integraria com uma API real
      console.log("Buscando previsão para:", city)

      // Por enquanto, apenas atualiza a cidade nos dados mock
      setWeatherData((prev) => ({
        ...prev,
        current: {
          ...prev.current,
          city: city,
        },
      }))
    } catch (err) {
      setError("Erro ao buscar dados meteorológicos: " + err)
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
