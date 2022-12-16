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

  insert: async (req, res) => {
    let json = { error: '', result: {} }

    let team_name = req.body.team_name
    let team = req.body.team

    if (team_name && team) {
      let team_id = await TeamService.insert(team_name, team)
      json.result = {
        team_id: team_id,
        team_name,
        team,
      }
    } else {
      json.error = 'Not enough information to create a team'
    }

    res.json(json)
  },
}
