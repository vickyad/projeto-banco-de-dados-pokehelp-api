const database = require('../database')

module.exports = {
  getAll: () => {
    return new Promise((accepted, rejected) => {
      database.query(
        'SELECT * FROM Team; SELECT team_id, url FROM Team_Member',
        (error, results) => {
          if (error) {
            rejected(error)
            return
          }
          const groups = results[1].reduce((groups, item) => {
            return {
              ...groups,
              [item.team_id]: [...(groups[item.team_id] || []), item.url],
            }
          }, {})

          for (i in results[0]) {
            let team = results[0][i]
            results[0][i] = {
              ...team,
              team: groups[team.team_id],
            }
          }
          accepted(results[0])
        }
      )
    })
  },
  getOne: (team_id) => {
    return new Promise((accepted, rejected) => {
      database.query(
        'SELECT * FROM Team WHERE team_id = ?; SELECT * FROM Team_Member WHERE team_id = ?',
        [team_id, team_id],
        (error, results) => {
          if (error) {
            rejected(error)
            return
          }
          if (results.length > 0) {
            const data = {
              id: results[0][0].team_id,
              name: results[0][0].name,
              team: results[1],
            }
            accepted(data)
          } else {
            accepted(false)
          }
        }
      )
    })
  },
}
