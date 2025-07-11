"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export default function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check authentication status
    // This would typically check localStorage, cookies, or make an API call
    const checkAuth = () => {
      const token = localStorage.getItem("authToken")
      const isAuth = !!token
      setIsAuthenticated(isAuth)

      if (requireAuth && !isAuth) {
        router.push("/auth/login")
      } else if (!requireAuth && isAuth) {
        router.push("/")
      }
    }

    checkAuth()
  }, [requireAuth, router])

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // If auth is required and user is not authenticated, don't render children
  if (requireAuth && !isAuthenticated) {
    return null
  }

  // If auth is not required and user is authenticated, don't render children
  if (!requireAuth && isAuthenticated) {
    return null
  }

  return <>{children}</>
}
