export function PageFooter() {
  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        <span className="text-white/70 text-sm">
          Dados atualizados em tempo real • Última atualização: {new Date().toLocaleTimeString("pt-BR")}
        </span>
      </div>
    </div>
  )
}
