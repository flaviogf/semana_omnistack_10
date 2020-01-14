import axios from 'axios'
import Dev from '../models/Dev'

class DevController {
  async store(req, res) {
    const { username, techs, latitude, longitude } = req.body

    const response = await axios.get(`https://api.github.com/users/${username}`)

    const { name = login, avatar_url, bio } = response.data

    const dev = await Dev.create({
      username,
      techs: techs.split(',').map(it => it.trim()),
      name,
      avatar_url,
      bio,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    })

    res.status(200).json(dev)
  }

  async index(req, res) {
    const { techs = '', latitude, longitude } = req.query

    const devs = await Dev.find({
      techs: {
        $in: techs.split(',').map(it => it.trim())
      },
      location: {
        $near: {
          $maxDistance: 1000,
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          }
        }
      }
    })

    return res.status(200).json(devs)
  }
}

export default new DevController()
