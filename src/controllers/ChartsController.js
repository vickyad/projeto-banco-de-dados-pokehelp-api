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
  typePerGeneration: async (req, res) => {
    let json = { error: '', result: [] }
    let generation = req.params.generation
    let typeGeneration = await ChartsService.typePerGeneration(generation)

    if (typeGeneration) {
      let types_label = []
      let types_count = []
      typeGeneration.map((type) => {
        types_label.push(type.type_)
        types_count.push(type.total)
      })
      json.result = { label: types_label, values: types_count }
    }
    res.json(json)
  },
  typeLegendary: async (_req, res) => {
    let json = { error: '', result: [] }
    let typeLegendary = await ChartsService.typeLegendary()

    if (typeLegendary) {
      let types_label = []
      let types_count = []
      typeLegendary.map((type) => {
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
      let types_label = []
      let types_count = []
      commonMoves.map((type) => {
        types_label.push(type.name)
        types_count.push(type.total)
      })
      json.result = { label: types_label, values: types_count }
    }
    res.json(json)
  },
  uniqueMovesTypes: async (_req, res) => {
    let json = { error: '', result: [] }
    let uniqueMoves = await ChartsService.uniqueMovesTypes()

    if (uniqueMoves) {
      let types_label = []
      let types_count = []

      uniqueMoves.map((move) => {
        types_label.push(move.move_type)
        types_count.push(move.total)
      })
      json.result = { label: types_label, values: types_count }
    }
    res.json(json)
  },
  uniqueMovesCategory: async (_req, res) => {
    let json = { error: '', result: [] }
    let uniqueMoves = await ChartsService.uniqueMovesCategory()

    if (uniqueMoves) {
      let types_label = []
      let types_count = []

      uniqueMoves.map((move) => {
        types_label.push(move.move_category)
        types_count.push(move.total)
      })
      json.result = { label: types_label, values: types_count }
    }
    res.json(json)
  },
  avgStats: async (req, res) => {
    let json = { error: '', result: [] }
    let type = req.params.type
    let allAvgStats = await ChartsService.avgStats(type)

    if (allAvgStats) {
      json.result = {
        label: Object.keys(allAvgStats),
        values: Object.values(allAvgStats),
      }
    }
    res.json(json)
  },
}
