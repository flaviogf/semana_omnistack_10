import React, { useEffect, useState } from 'react'

import './style.css'

import api from '../services/api'

function useForm(onSubmitted) {
  const [username, setUsername] = useState('')
  const [techs, setTechs] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        setLatitude(latitude)
        setLongitude(longitude)
      },
      () => { }
    )
  }, [])

  async function onSubmit(e) {
    e.preventDefault()

    const response = await api.post('/user', {
      username,
      techs,
      latitude,
      longitude
    })

    setUsername('')
    setTechs('')

    onSubmitted(response.data)
  }

  return {
    username,
    setUsername,
    techs,
    setTechs,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    onSubmit
  }
}

function Form({ onSubmitted }) {
  const form = useForm(onSubmitted)

  return (
    <form className="form" onSubmit={form.onSubmit}>
      <strong className="form__title">Register</strong>

      <div className="form__group">
        <label className="form__label">Username</label>
        <input className="form__input" value={form.username} onChange={e => form.setUsername(e.target.value)} />
      </div>

      <div className="form__group">
        <label className="form__label">Techs</label>
        <input className="form__input" value={form.techs} onChange={e => form.setTechs(e.target.value)} />
      </div>

      <div className="form__inline">
        <div className="form__group">
          <label className="form__label">Latitude</label>
          <input className="form__input" value={form.latitude} onChange={e => form.setLatitude(e.target.value)} />
        </div>

        <div className="form__group">
          <label className="form__label">Longitude</label>
          <input className="form__input" value={form.longitude} onChange={e => form.setLongitude(e.target.value)} />
        </div>
      </div>

      <div className="form__group">
        <button className="form__button" type="submit">
          Save
      </button>
      </div>
    </form>
  )
}

export default Form
