import axios from 'axios'
import githubConfig from '../config/github'
import Dev from '../models/Dev'

class DevController {
  async store(req, res) {
    const { username, techs, latitude, longitude } = req.body

    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: { authorization: githubConfig.token },
      }
    )

    const { name = login, avatar_url, bio } = response.data

    const dev = await Dev.create({
      username,
      techs: techs.split(',').map(it => it.trim()),
      name,
      avatar_url,
      bio,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    })

    res.status(200).json(dev)
  }

  async index(req, res) {
    const devs = await Dev.find()

    return res.status(200).json(devs)
  }
}

export default new DevController()
