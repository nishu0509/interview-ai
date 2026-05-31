import { createContext, useState, useEffect } from "react"
import { getMe } from "./services/auth.api"
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const restoreSession = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        if (isMounted) {
          setUser(null)
          setLoading(false)
        }
        return
      }

      try {
        const data = await getMe()
        if (isMounted) setUser(data.user)
      } catch (err) {
        const status = err.response?.status
        if (status !== 401) {
          console.error("Session restore failed:", err)
        }
        localStorage.removeItem("token")
        if (isMounted) setUser(null)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    restoreSession()
    return () => { isMounted = false }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  )
}