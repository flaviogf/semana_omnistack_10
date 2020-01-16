import React from 'react'

import './style.css'

function UserItem({ user }) {
  return (
    <li className="user-item">
      <header className="user-item__header">
        <img
          className="user-item__image"
          src={user.avatar_url}
          alt="avatar"
        />

        <div className="user-item__info">
          <p className="user-item__name">{user.name}</p>
          {user.techs.map(it => (<span className="user-item__techs">{it}</span>))}
        </div>
      </header>

      <p className="user-item__bio">{user.bio}</p>

      <a className="user-item__link" href={`https://github.com/${user.username}`}>
        Acessar perfil no github
      </a>
    </li>
  )
}

export default UserItem
