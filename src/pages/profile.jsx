import '../app.css'
import Header from '../components/header/header'
import SideBar from '../components/sideBar/sideBar'
import Main from '../components/main/main'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { normalizeUsers } from '../service/normalize-data'

function App() {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchUser() {
      const users = await normalizeUsers(Number(id))
      setUser(users[0])
    }
    fetchUser()
  }, [id])

  if (!user) return <div>Chargement...</div>

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