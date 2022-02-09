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
  authenticate (cb) {
    fakeAuth.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout (cb) {
    fakeAuth.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const Public = () => <h2>Public Page</h2>

const Private = () => <h2>Private Page</h2>

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { from } = location.state || { from: '/public' }

  const login = () => {
    fakeAuth.authenticate(() => navigate(from, { replace: true }))
  }

  return (
    <div>
      <p>You must log in to view the page at </p>
      <button onClick={login}>Log in</button>
    </div>
  )
}

const NotFound = () => <h1>NotFound</h1>

const AuthButton = () => {
  const navigate = useNavigate()
  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome!{' '}
      <button
        onClick={() => {
          fakeAuth.signout(() => navigate('/public'))
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
}

const PrivateRoute = ({ ...props }) => {
  const location = useLocation()
  return fakeAuth.isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Navigate to='/login' replace state={{ from: location }} />
  )
}

const App = () => {
  return (
    <div>
      <AuthButton />
      <Link to='/public'>Public</Link> <Link to='/private'>Private</Link>
      <Routes>
        <Route path='public' element={<Public />} />
        <PrivateRoute path='private' element={<Private />} />
        <Route path='login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
