const ItemService = require('../services/ItemService')

module.exports = {
  getAll: async (_req, res) => {
    let json = { error: '', result: [] }
    let items = await ItemService.getAll()

    if (items) {
      json.result = items
    }
    res.json(json)
  },
}
