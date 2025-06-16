import { Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Profile from './pages/profile.jsx' 

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile/:id" element={<Profile />} />
    </Routes>
  )
}

export default AppRouter