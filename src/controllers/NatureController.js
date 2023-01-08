const NatureService = require('../services/NatureService')

module.exports = {
  getAll: async (_req, res) => {
    let json = { error: '', result: [] }
    let items = await NatureService.getAll()

    if (items) {
      json.result = items
    }
    res.json(json)
  },
}
