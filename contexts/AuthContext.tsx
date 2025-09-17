"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  _id: string
  name: string
  email: string
  isActive: boolean
  lastLogin: string | null
  createdAt: string
  updatedAt: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se estamos no cliente
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('auth_token')
      if (savedToken) {
        verifyToken(savedToken)
      } else {
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }, [])

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.data)
        setToken(token)
      } else {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token')
        }
        setUser(null)
        setToken(null)
      }
    } catch (error) {
      console.error('Erro ao verificar token:', error)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
      }
      setUser(null)
      setToken(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.data.user)
        setToken(data.data.token)
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', data.data.token)
        }
      } else {
        throw new Error(data.error || 'Erro no login')
      }
    } catch (error) {
      console.error('Erro no login:', error)
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.data.user)
        setToken(data.data.token)
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', data.data.token)
        }
      } else {
        throw new Error(data.error || 'Erro no registro')
      }
    } catch (error) {
      console.error('Erro no registro:', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
    }
  }

  const value = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
