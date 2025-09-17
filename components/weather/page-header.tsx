import { Sun } from "lucide-react"

export function PageHeader() {
  return (
    <div className="text-center space-y-6 py-8">
      <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
        <Sun className="h-6 w-6 text-amber-400" />
        <span className="text-white/90 font-medium">Previsão do Tempo</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
        Clima Data
      </h1>
      <p className="text-xl text-white/70 max-w-2xl mx-auto">
        Acompanhe as condições meteorológicas em tempo real com alertas inteligentes
      </p>
    </div>
  )
}
