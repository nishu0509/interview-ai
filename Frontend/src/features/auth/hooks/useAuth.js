import { useContext, useCallback } from "react"
import { AuthContext } from "../auth.context"
import { login, register, logout } from "../services/auth.api"

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  const { user, setUser, loading, setLoading } = context

  const handleLogin = useCallback(async ({ email, password }) => {
    setLoading(true)
    try {
      const data = await login({ email, password })
      localStorage.setItem("token", data.token)
      setUser(data.user)
      return { success: true }
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.message,
      }
    } finally {
      setLoading(false)
    }
  }, [setUser, setLoading])

  const handleRegister = useCallback(async ({ username, email, password }) => {
    setLoading(true)
    try {
      const data = await register({ username, email, password })
      localStorage.setItem("token", data.token)
      setUser(data.user)
      return { success: true }
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.message,
      }
    } finally {
      setLoading(false)
    }
  }, [setUser, setLoading])

  const handleLogout = useCallback(async () => {
    setLoading(true)
    try {
      localStorage.removeItem("token")
      await logout()
      setUser(null)
    } catch (err) {
      console.error("Logout failed:", err)
    } finally {
      setLoading(false)
    }
  }, [setUser, setLoading])

  return { user, loading, handleLogin, handleRegister, handleLogout }
}