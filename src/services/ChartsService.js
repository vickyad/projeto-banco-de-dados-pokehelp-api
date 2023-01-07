const database = require('../database')

module.exports = {
  types: () => {
    return new Promise((accepted, rejected) => {
      database.query(
        'SELECT type_, sum(total) total FROM (SELECT type_1 as type_, COUNT(*) as total FROM pokedex.pokemons GROUP BY type_1 UNION ALL SELECT type_2 as type_, COUNT(*) as total FROM pokedex.pokemons WHERE type_2 IS NOT NULL GROUP BY type_2) t GROUP BY type_ ORDER BY type_',
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
  typePerGeneration: (generation) => {
    return new Promise((accepted, rejected) => {
      database.query(
        'SELECT type_, sum(total) total FROM (SELECT type_1 as type_, generation, COUNT(*) as total FROM pokedex.pokemons WHERE generation = ? GROUP BY type_1 UNION ALL SELECT type_2 as type_, generation, COUNT(*) as total FROM pokedex.pokemons WHERE type_2 IS NOT NULL AND generation = ? GROUP BY type_2) t GROUP BY type_ ORDER BY type_',
        [generation, generation],
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
  typeLegendary: () => {
    return new Promise((accepted, rejected) => {
      database.query(
        'SELECT type_, sum(total) total FROM (SELECT type_1 as type_, COUNT(*) as total FROM pokedex.pokemons WHERE is_legendary = 1 GROUP BY type_1 UNION ALL SELECT type_2 as type_, COUNT(*) as total FROM pokedex.pokemons WHERE type_2 IS NOT NULL AND is_legendary = 1 GROUP BY type_2) t GROUP BY type_ ORDER BY type_',
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
        'SELECT distinct CASE WHEN type_1 < type_2 THEN type_1 ELSE type_2 END AS FstType, CASE WHEN type_1 > type_2 THEN type_1 ELSE type_2 END AS SndType, total FROM (SELECT type_1, type_2, COUNT(*) as total FROM pokedex.pokemons WHERE type_2 IS NOT NULL GROUP BY type_1, type_2 ORDER BY total DESC) as t LIMIT 5',
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
        'SELECT pokedex.moves.name, COUNT(*) as total FROM pokedex.pokemons_moves INNER JOIN pokedex.moves ON pokedex.pokemons_moves.move_id = pokedex.moves.move_id GROUP BY pokedex.moves.move_id ORDER BY total DESC LIMIT 10',
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
  uniqueMovesTypes: () => {
    return new Promise((accepted, rejected) => {
      database.query(
        'SELECT move_type, COUNT(*) as total FROM (SELECT pokedex.pokemons_moves.move_id , pokedex.moves.type as move_type FROM pokedex.pokemons_moves INNER JOIN pokedex.moves ON pokedex.pokemons_moves.move_id = pokedex.moves.move_id GROUP BY move_id HAVING count(*) = 1) as t GROUP BY move_type ORDER BY move_type',
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
  uniqueMovesCategory: () => {
    return new Promise((accepted, rejected) => {
      database.query(
        'SELECT move_category, COUNT(*) as total FROM (SELECT pokedex.pokemons_moves.move_id , pokedex.moves.category as move_category FROM pokedex.pokemons_moves INNER JOIN pokedex.moves ON pokedex.pokemons_moves.move_id = pokedex.moves.move_id GROUP BY move_id HAVING count(*) = 1) as t GROUP BY move_category',
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
  avgStats: (type) => {
    return new Promise((accepted, rejected) => {
      database.query(
        'SELECT AVG(hp) as hp, AVG(attack) as attack, AVG(defense) as defense, AVG(sp_attack) as sp_attack, AVG(sp_defense) as sp_defense, AVG(speed) as speed FROM pokedex.pokemons WHERE type_1 = ? OR type_2 = ?',
        [type, type],
        (error, results) => {
          if (error) {
            rejected(error)
            return
          }
          accepted(results[0])
        }
      )
    })
  },
}
