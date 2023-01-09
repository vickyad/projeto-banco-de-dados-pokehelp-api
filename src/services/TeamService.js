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

            database.query(
              'SELECT name, pokemon_id FROM Pokemons WHERE pokemon_id = ? OR pokemon_id = ? OR pokemon_id = ? OR pokemon_id = ? OR pokemon_id = ? OR pokemon_id = ?',
              [
                data.team[0].pokemon_id,
                data.team[1].pokemon_id,
                data.team[2].pokemon_id,
                data.team[3].pokemon_id,
                data.team[4].pokemon_id,
                data.team[5].pokemon_id,
              ],
              (error, results) => {
                if (error) {
                  rejected(error)
                  return
                }

                data.team.map((teamMember, index) => {
                  data.team[index] = {
                    ...teamMember,
                    name: results.find(
                      (poke) => poke.pokemon_id === teamMember.pokemon_id
                    ).name,
                  }
                })
                accepted(data)
              }
            )
          } else {
            accepted(false)
          }
        }
      )
    })
  },

  insert: (team_name, team) => {
    return new Promise((accepted, rejected) => {
      database.query(
        'INSERT INTO Team (name) VALUES (?)',
        [team_name],
        (error, results) => {
          if (error) {
            rejected(error)
            return
          }
          let team_id = results.insertId

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
                accepted(team_id)
              }
            )
          })
        }
      )
    })
  },

  edit: (team_id, team_name, team) => {
    return new Promise((accepted, rejected) => {
      database.query(
        'UPDATE Team SET name= ? WHERE team_id = ?',
        [team_name, team_id],
        (error, results) => {
          if (error) {
            rejected(error)
            return
          }

          database.query(
            'DELETE FROM Team_Member WHERE team_id = ?;',
            [team_id],
            (error, results) => {
              if (error) {
                rejected(error)
                return
              }
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
                    accepted(team_id)
                  }
                )
              })
            }
          )

          /*
          database.query(
            'INSERT INTO Team_Member (team_id, pokemon_id, url, nature_id, item_id, move_1_id, move_2_id, move_3_id, move_4_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);INSERT INTO Team_Member (team_id, pokemon_id, url, nature_id, item_id, move_1_id, move_2_id, move_3_id, move_4_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);INSERT INTO Team_Member (team_id, pokemon_id, url, nature_id, item_id, move_1_id, move_2_id, move_3_id, move_4_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);INSERT INTO Team_Member (team_id, pokemon_id, url, nature_id, item_id, move_1_id, move_2_id, move_3_id, move_4_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);INSERT INTO Team_Member (team_id, pokemon_id, url, nature_id, item_id, move_1_id, move_2_id, move_3_id, move_4_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);INSERT INTO Team_Member (team_id, pokemon_id, url, nature_id, item_id, move_1_id, move_2_id, move_3_id, move_4_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
            [
              team[0].pokemon_id,
              team[0].url,
              team[0].nature_id,
              team[0].item_id,
              team[0].move_1_id,
              team[0].move_2_id,
              team[0].move_3_id,
              team[0].move_4_id,
              team_id,
              team[0].member_id,
              team[1].pokemon_id,
              team[1].url,
              team[1].nature_id,
              team[1].item_id,
              team[1].move_1_id,
              team[1].move_2_id,
              team[1].move_3_id,
              team[1].move_4_id,
              team_id,
              team[1].member_id,
              team[2].pokemon_id,
              team[2].url,
              team[2].nature_id,
              team[2].item_id,
              team[2].move_1_id,
              team[2].move_2_id,
              team[2].move_3_id,
              team[2].move_4_id,
              team_id,
              team[2].member_id,
              team[3].pokemon_id,
              team[3].url,
              team[3].nature_id,
              team[3].item_id,
              team[3].move_1_id,
              team[3].move_2_id,
              team[3].move_3_id,
              team[3].move_4_id,
              team_id,
              team[3].member_id,
              team[4].pokemon_id,
              team[4].url,
              team[4].nature_id,
              team[4].item_id,
              team[4].move_1_id,
              team[4].move_2_id,
              team[4].move_3_id,
              team[4].move_4_id,
              team_id,
              team[4].member_id,
              team[5].pokemon_id,
              team[5].url,
              team[5].nature_id,
              team[5].item_id,
              team[5].move_1_id,
              team[5].move_2_id,
              team[5].move_3_id,
              team[5].move_4_id,
              team_id,
              team[5].member_id,
            ],
            (error, results) => {
              if (error) {
                rejected(error)
                return
              }
              accepted(team_id)
            }
          )
          */
        }
      )
    })
  },

  delete: (team_id) => {
    return new Promise((accepted, rejected) => {
      database.query(
        'DELETE FROM Team_Member WHERE team_id = ?; DELETE FROM Team WHERE team_id = ?',
        [team_id, team_id],
        (error, results) => {
          if (error) {
            rejected(error)
            return
          }
          accepted(results)
        }
      )
    })
  },
}
