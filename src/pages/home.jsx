import '../app.css'
import Header from '../components/header/header'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { normalizeUsers } from '../service/normalize-data'

function Home() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchUsers() {
      const ids = [12, 18]
      const allUsers = await Promise.all(
        ids.map(async (id) => {
          const userArr = await normalizeUsers(id)
          return userArr && userArr.length > 0 ? userArr[0] : null
        })
      )
      setUsers(allUsers.filter(Boolean))
    }
    fetchUsers()
  }, [])

  return (
    <>
      <Header />
      <div>
        <h1>Liste des utilisateurs</h1>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <Link style={{ color: "black" }} to={`/profile/${user.id}`}>
                {user.firstName} (ID: {user.id})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Home