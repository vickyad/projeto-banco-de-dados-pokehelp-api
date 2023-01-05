const ChartsService = require('../services/ChartsService')

module.exports = {
  types: async (_req, res) => {
    let json = { error: '', result: [] }
    let types = await ChartsService.types()

    if (types) {
      let types_label = []
      let types_count = []

      types.map((type) => {
        types_label.push(type.type_)
        types_count.push(type.total)
      })

      json.result = { label: types_label, values: types_count }
    }
    res.json(json)
  },
  typeCombination: async (_req, res) => {
    let json = { error: '', result: [] }
    let typeCombination = await ChartsService.typeCombination()

    if (typeCombination) {
      let types_label = []
      let types_count = []
      typeCombination.map((type) => {
        types_label.push(`${type.FstType} and ${type.SndType}`)
        types_count.push(type.total)
      })
      json.result = { label: types_label, values: types_count }
    }
    res.json(json)
  },
  commonMoves: async (_req, res) => {
    let json = { error: '', result: [] }
    let commonMoves = await ChartsService.commonMoves()

    if (commonMoves) {
      json.result = { commonMoves }
    }
    res.json(json)
  },
}
