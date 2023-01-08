const MoveService = require('../services/MoveService')

module.exports = {
  getAll: async (req, res) => {
    let json = { error: '', result: [] }
    let pokemon_id = req.params.pokemon_id
    let moves = await MoveService.getAll(pokemon_id)

    if (moves) {
      json.result = moves
    }
    res.json(json)
  },
}
