import Dev from '../models/Dev'

class SearchController {
  async index(req, res) {
    const { techs = '', latitude = 0, longitude = 0 } = req.query

    const devs = await Dev.find({
      techs: {
        $in: techs.split(',').map(it => it.trim()),
      },
      location: {
        $near: {
          $maxDistance: 10000,
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
        },
      },
    })

    return res.status(200).json(devs)
  }
}

export default new SearchController()
