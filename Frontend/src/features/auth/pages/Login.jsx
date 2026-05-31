import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import "./auth.form.scss"

const Login = () => {
  const { loading, handleLogin } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")  // ← sirf yeh add kiya

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")  // ← submit pe pehle clear karo
    const result = await handleLogin({ email, password })
    if (result.success) {
      navigate('/home')
    } else {
      setError(result.error)  // ← error show karo
    }
  }

  if (loading) {
    return <main><h1>Loading.......</h1></main>
  }

  return (
    <main>
      <div className='form-container'>
        <h1>Login</h1>

        {error && <p className="error-message">{error}</p>}  {/* ← error display */}

        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
            />
          </div>

          <div className='input-group'>
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
            />
          </div>

          <button className='button primary-button'>Login</button>
        </form>

        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login