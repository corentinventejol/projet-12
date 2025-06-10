import './app.css'
import Header from './components/header/header'
import { normalizeUsers } from '../service/normalize-data'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function home() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Si normalizeUsers est une fonction synchrone
    const data = normalizeUsers()
    setUsers(data)
    // Si c'est une fonction asynchrone, utiliser :
    // normalizeUsers().then(data => setUsers(data))
  }, [])

  // Extraire les IDs disponibles
  const ids = users && users.length > 0
    ? users.map(user => user.id)
    : []

  return (
    <>
      <Header />
      <ul>
        {ids.map(id => (
          <li key={id}>
            <Link to={`/profile/${id}`}>Profil {id}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default home