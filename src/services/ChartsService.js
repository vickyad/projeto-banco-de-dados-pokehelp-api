const database = require('../database')

module.exports = {
  types: () => {
    return new Promise((accepted, rejected) => {
      database.query(
        'SELECT type_, sum(total) total FROM (SELECT type_1 as type_, COUNT(*) as total FROM pokedex.pokemons GROUP BY type_1 UNION ALL SELECT type_2 as type_, COUNT(*) as total FROM pokedex.pokemons WHERE type_2 IS NOT NULL GROUP BY type_2) t GROUP BY type_',
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
  typeCombination: () => {
    return new Promise((accepted, rejected) => {
      database.query(
        'SELECT distinct CASE WHEN type_1 < type_2 THEN type_1 ELSE type_2 END AS FstType, CASE WHEN type_1 > type_2 THEN type_1 ELSE type_2 END AS SndType, total FROM (SELECT type_1, type_2, COUNT(*) as total FROM pokedex.pokemons WHERE type_2 IS NOT NULL GROUP BY type_1, type_2 ORDER BY total DESC) as t LIMIT 10',
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
  commonMoves: () => {
    return new Promise((accepted, rejected) => {
      database.query(
        'SELECT pokedex.moves.name, pokedex.pokemons_moves.move_id, COUNT(*) as total FROM pokedex.pokemons_moves INNER JOIN pokedex.moves ON pokedex.pokemons_moves.move_id = pokedex.moves.move_id GROUP BY move_id ORDER BY total DESC LIMIT 5',
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
