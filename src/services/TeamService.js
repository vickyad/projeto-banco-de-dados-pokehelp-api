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

  insert: (team_name, team) => {
    return new Promise((accepted, rejected) => {
      let team_id

      database.query(
        'INSERT INTO Team (name) VALUES (?)',
        [team_name],
        (error, results) => {
          if (error) {
            rejected(error)
            return
          }
          team_id = results.insertId
        }
      )

      team.map((team_member) => {
        database.query(
          'INSERT INTO Team_Member (team_id, pokemon_id, url, nature_id, item_id, move_1_id, move_2_id, move_3_id, move_4_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            team_id,
            team_member.pokemon_id,
            team_member.url,
            team_member.nature_id,
            team_member.item_id,
            team_member.move_1_id,
            team_member.move_2_id,
            team_member.move_3_id,
            team_member.move_4_id,
          ],
          (error, results) => {
            if (error) {
              rejected(error)
              return
            }
            accepted({ team: team_id, team: results[0] })
          }
        )
      })
    })
  },
}
