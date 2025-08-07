import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AlertIcon } from "./alert-icon"
import type { WeatherAlert } from "@/types/weather"

interface WeatherAlertsProps {
  alerts: WeatherAlert[]
}

export function WeatherAlerts({ alerts }: WeatherAlertsProps) {
  if (alerts.length === 0) return null

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <AlertTriangle className="h-8 w-8 text-amber-400" />
        Alertas Meteorológicos
      </h2>
      <div className="grid gap-4">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            className={`bg-white/10 backdrop-blur-xl border-l-4 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 ${
              alert.type === "warning"
                ? "border-l-amber-400 bg-amber-500/10"
                : alert.type === "danger"
                  ? "border-l-red-400 bg-red-500/10"
                  : "border-l-blue-400 bg-blue-500/10"
            }`}
          >
            <AlertIcon type={alert.type} />
            <AlertTitle className="flex items-center gap-3 text-white text-lg">
              {alert.title}
              <Badge
                variant="secondary"
                className={`${
                  alert.type === "warning"
                    ? "bg-amber-500/20 text-amber-200 border-amber-400/30"
                    : "bg-blue-500/20 text-blue-200 border-blue-400/30"
                }`}
              >
                {alert.severity}
              </Badge>
            </AlertTitle>
            <AlertDescription className="text-white/80 text-base leading-relaxed">
              {alert.description}
              <div className="mt-3 text-sm text-white/60 font-medium">Válido até: {alert.validUntil}</div>
            </AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  )
}
