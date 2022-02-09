import React from 'react'
import './App.css'

import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate
} from 'react-router-dom'

// Simuler une connexion
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const Public = () => <h2>Public Page</h2>

const Private = () => <h2>Private Page</h2>

const Login = () => <h2>Login Page</h2>

const NotFound = () => <h1>NotFound</h1>

const App = () => {
  return (
    <div>
      <Link to='/public'>Public</Link> <Link to='/private'>Private</Link>
      <Routes>
        <Route path='public' element={<Public />} />
        <Route path='private' element={<Private />} />
        <Route path='login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
