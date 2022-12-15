const TeamService = require('../services/TeamService')

module.exports = {
  getAll: async (_req, res) => {
    let json = { error: '', result: [] }
    let teams = await TeamService.getAll()

    for (let i in teams) {
      json.result.push(teams[i])
    }

    res.json(json)
  },
  getOne: async (req, res) => {
    let json = { error: '', result: {} }
    let team_id = req.params.team_id
    let team = await TeamService.getOne(team_id)

    if (team) {
      json.result = team
    }
    res.json(team)
  },
}
