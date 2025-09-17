"use client"

import { useState } from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-lg font-bold transition-colors"
        >
          ×
        </button>
        
        <div className="bg-gradient-to-br from-blue-900/90 to-purple-900/90 backdrop-blur-md rounded-lg p-6 border border-white/20">
          {isLogin ? (
            <>
              <LoginForm />
              <div className="mt-4 text-center">
                <p className="text-white/70 text-sm">
                  Não tem uma conta?{' '}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-blue-300 hover:text-blue-200 underline"
                  >
                    Criar conta
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              <RegisterForm />
              <div className="mt-4 text-center">
                <p className="text-white/70 text-sm">
                  Já tem uma conta?{' '}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-blue-300 hover:text-blue-200 underline"
                  >
                    Fazer login
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
