import React from 'react'

function App() {
  return (
    <div className="app">
      <form className="form">
        <strong className="form__title">Register</strong>

        <div className="form__group">
          <label className="form__label">Username</label>
          <input className="form__input" />
        </div>

        <div className="form__group">
          <label className="form__label">Techs</label>
          <input className="form__input" />
        </div>

        <div className="form__inline">
          <div className="form__group">
            <label className="form__label">Latitude</label>
            <input className="form__input" />
          </div>

          <div className="form__group">
            <label className="form__label">Longitude</label>
            <input className="form__input" />
          </div>
        </div>

        <div className="form__group">
          <button className="form__button" type="submit">
            Save
          </button>
        </div>
      </form>

      <ul className="users">
        <li className="user-item">
          <header className="user-item__header">
            <img
              src="https://avatars2.githubusercontent.com/u/17479978?s=460&v=4"
              className="user-item__image"
              alt="avatar"
            />

            <div className="user-item__info">
              <p className="user-item__name">Flavio Fernandes</p>
              <p className="user-item__techs">NodeJS, React JS, React Native</p>
            </div>
          </header>

          <p className="user-item__bio">Software Developer at SMN.</p>

          <a className="user-item__link" href="https://github.com/flaviogf">
            Acessar perfil no github
          </a>
        </li>

        <li className="user-item">
          <header className="user-item__header">
            <img
              src="https://avatars2.githubusercontent.com/u/17479978?s=460&v=4"
              className="user-item__image"
              alt="avatar"
            />

            <div className="user-item__info">
              <p className="user-item__name">Flavio Fernandes</p>
              <p className="user-item__techs">NodeJS, React JS, React Native</p>
            </div>
          </header>

          <p className="user-item__bio">Software Developer at SMN.</p>

          <a className="user-item__link" href="https://github.com/flaviogf">
            Acessar perfil no github
          </a>
        </li>
      </ul>
    </div>
  )
}

export default App
