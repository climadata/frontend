import { AlertTriangle, Info, CheckCircle } from "lucide-react"
import type { AlertType } from "@/types/weather"

interface AlertIconProps {
  type: AlertType
}

export function AlertIcon({ type }: AlertIconProps) {
  const iconMap = {
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    danger: <AlertTriangle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
    success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
  }

  return iconMap[type] || iconMap.info
}
