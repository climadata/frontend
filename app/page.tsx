"use client"
import { useState } from 'react'
import { Background } from "@/components/layout/background"
import { PageHeader } from "@/components/weather/page-header"
import { PageFooter } from "@/components/weather/page-footer"
import { SearchForm } from "@/components/weather/search-form"
import { CurrentWeatherCard } from "@/components/weather/current-weather"
import { WeatherDetails } from "@/components/weather/weather-details"
import { ForecastCard } from "@/components/weather/forecast-card"
import { useWeather } from "@/hooks/use-weather"
import { useAuth } from "@/contexts/AuthContext"
import { AuthModal } from "@/components/auth/AuthModal"

export default function WeatherPage() {
  const { weatherData, isLoading, error, searchWeather } = useWeather()
  const { user, isAuthenticated, logout, isLoading: authLoading } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  if (authLoading) {
    return (
      <Background>
        <div className="relative z-10 p-4 md:p-8">
          <div className="max-w-7xl mx-auto flex items-center justify-center min-h-screen">
            <div className="text-white text-xl">Carregando...</div>
          </div>
        </div>
      </Background>
    )
  }

  return (
    <Background>
      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header com autenticação */}
          <div className="relative">
            <PageHeader />
            <div className="absolute top-0 right-0">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <span className="text-white">Olá, {user?.name}!</span>
                  <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Entrar / Criar Conta
                </button>
              )}
            </div>
          </div>

          <SearchForm onSearch={searchWeather} isLoading={isLoading} />

          {error && (
            <div className="text-center text-red-300 bg-red-500/10 backdrop-blur-md rounded-lg p-4 border border-red-500/20">
              {error}
            </div>
          )}

          {weatherData && (
            <>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <CurrentWeatherCard weather={weatherData.current} />
                <WeatherDetails weather={weatherData.current} />
              </div>
              <ForecastCard forecast={weatherData.forecast} />
            </>
          )}

          <PageFooter />
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </Background>
  )
}