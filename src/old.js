import React, { useEffect, useState } from 'react'
import './App.css'

import {
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
  Outlet,
  useNavigate,
  useLocation
} from 'react-router-dom'

const useQuery = () => new URLSearchParams(useLocation().search)

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <Link to='/about'>About</Link> <Link to='/courses'>Courses</Link>
      <Form />
    </>
  )
}
const Courses = () => {
  const navigate = useNavigate()
  return (
    <>
      <h1>Courses</h1>
      {/* <Outlet /> */}
      <button onClick={() => navigate('/')}>HOME</button>
      <Routes>
        <Route path='/' element={<HomeCourse />} />
        <Route path=':course' element={<Course />} />
        <Route path='review' element={<Review />} />
      </Routes>
      <Link to='/'>Home</Link> <Link to='js'>JavaScript</Link>{' '}
      <Link to='react'>React</Link> <Link to='review'>Review</Link>
    </>
  )
}
const About = () => {
  const location = useLocation()
  console.log(location)
  return (
    <>
      <h1>About</h1>
      <Link to='/'>Home</Link>
    </>
  )
}
const HomeCourse = () => {
  return (
    <>
      <h1>All Courses</h1>
      <Link to='/'>Home</Link>
    </>
  )
}
const Review = () => {
  return (
    <>
      <h1>Review</h1>
    </>
  )
}
const Course = () => {
  const query = useQuery()
  const [coupon, setCoupon] = useState('')

  useEffect(() => setCoupon(query.get('coupon')), [query])

  const { course } = useParams()
  return (
    <>
      <h1>Course : {course}</h1>
      <h2>Coupon : {coupon}</h2>
    </>
  )
}
const NotFound = () => {
  return (
    <>
      <h1>NotFound</h1>
    </>
  )
}
const HomeMenu = () => {
  return (
    <>
      <Link to='/'>Home</Link>{' '}
      <NavLink activeClassName='active' to='/about'>
        About
      </NavLink>{' '}
      <Link to='/courses'>Courses</Link>
    </>
  )
}
const CoursesMenu = () => {
  return (
    <>
      <Link to='/'>Home</Link> <Link to='js?coupon=dce'>JavaScript</Link>{' '}
      <Link to='react'>React</Link> <Link to='review'>Review</Link>
    </>
  )
}

const Layout = () => (
  <div className='App'>
    <div>
      <Routes>
        <Route path='/*' element={<HomeMenu />} />
        <Route path='courses/*' element={<CoursesMenu />} />
      </Routes>
    </div>
    <div>
      <Outlet />
    </div>
    <footer>footer</footer>
  </div>
)

const Form = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')

  const handleChange = event => setName(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()
    navigate('/about', { state: { name } })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={name}
        type='text'
        placeholder='Name...'
      />
      <button type='submit'>Submit</button>
    </form>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path='/*' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='courses/*' element={<Courses />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
