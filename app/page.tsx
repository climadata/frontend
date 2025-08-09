"use client"
import { Background } from "@/components/layout/background"
import { PageHeader } from "@/components/weather/page-header"
import { PageFooter } from "@/components/weather/page-footer"
import { SearchForm } from "@/components/weather/search-form"
import { CurrentWeatherCard } from "@/components/weather/current-weather"
import { WeatherDetails } from "@/components/weather/weather-details"
import { ForecastCard } from "@/components/weather/forecast-card"
import { useWeather } from "@/hooks/use-weather"

export default function WeatherPage() {
  const { weatherData, isLoading, error, searchWeather } = useWeather()

  return (
    <Background>
      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <PageHeader />

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
    </Background>
  )
}