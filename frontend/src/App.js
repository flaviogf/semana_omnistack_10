import React, { useEffect, useState } from 'react'

import Form from './Form'
import UserItem from './UserItem'

import api from './services/api'

function useApp() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/user')
      setUsers(response.data)
    }

    loadUsers()
  }, [])

  function addUser(user) {
    setUsers((value) => ([...value, user]))
  }

  return {
    users,
    addUser
  }
}

function App() {
  const app = useApp()

  return (
    <div className="app">
      <Form onSubmitted={app.addUser} />
      <ul className="users">
        {app.users.map((it => (
          <UserItem key={it._id} user={it} />
        )))}
      </ul>
    </div>
  )
}

export default App
