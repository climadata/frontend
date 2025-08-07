import type React from "react"
export function Background({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-blue-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Nuvens decorativas */}
        <div className="absolute top-20 left-10 w-32 h-16 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-12 bg-white/15 rounded-full blur-lg"></div>
        <div className="absolute top-60 left-1/3 w-40 h-20 bg-white/8 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-10 w-28 h-14 bg-white/12 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-36 h-18 bg-white/10 rounded-full blur-2xl"></div>

        {/* Padrão sutil */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:40px_40px]"></div>
        </div>

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-sky-300/30"></div>
      </div>

      {/* Conteúdo */}
      {children}
    </div>
  )
}
