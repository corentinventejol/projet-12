import { Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Profile from './pages/profile.jsx'
import Error404 from './pages/error404.jsx'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/404" element={<Error404 />} />
    </Routes>
  )
}

export default AppRouter