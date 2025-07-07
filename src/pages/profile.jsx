import '../app.css'
import Header from '../components/header/header'
import SideBar from '../components/sideBar/sideBar'
import Main from '../components/main/main'
import { useParams, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { normalizeUsers } from '../service/normalize-data'

function App() {
  const { id } = useParams()
  const [user, setUser] = useState(undefined)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    async function fetchUser() {
      const users = await normalizeUsers(Number(id))
      setUser(users[0])
      setHasLoaded(true)
    }
    fetchUser()
  }, [id])

  if (!hasLoaded) return <div>Chargement...</div>
  if (user === undefined) return <Navigate to="/404" replace />

  return (
    <>
      <Header />
      <div className='main-container'>
        <SideBar />
        <Main userId={Number(id)} />
      </div>
    </>
  )
}

export default App