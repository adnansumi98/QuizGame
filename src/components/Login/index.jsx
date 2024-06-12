import { useState } from 'react'
import Cookies from 'js-cookie'
// import { Navigate } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import './index.css'

const apiConstants = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
}

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const onchangeUsername = (event) => {
    setUsername(event.target.value)
  }
  const onchangePassword = (event) => {
    setPassword(event.target.value)
  }
  const onchangeShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const onSubmitLoginForm = async (event) => {
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }

    try {
      const response = await fetch('https://apis.ccbp.in/login', options)
      const data = await response.json()
    } catch (error) {
      console.error('Error occcured while logging in: ' + error)
    }
  }

  // {
  //   "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU"
  // }
  // TODO: Add a login function with API call

  return (
    <div className="login-conatiner">
      <form className="login-form" onSubmit={onSubmitLoginForm}>
        <img
          className="login-logo"
          src="../../../static/images/Logo.png"
          alt="Logo"
        />
        <label className="login-label" htmlFor="userName">
          USERNAME
        </label>
        <input
          className="login-input"
          type="text"
          id="userName"
          value={username}
          onChange={onchangeUsername}
        />
        <label className="login-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="login-input"
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={onchangePassword}
        />

        <div className="showpassword-container">
          <input
            className="showpassword-label"
            type="checkbox"
            id="toggleShowPassword"
            checked={showPassword}
            onChange={onchangeShowPassword}
          />
          <label className="showpassword-label" htmlFor="toggleShowPassword">
            Show Password
          </label>
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
