const database = require('../database')

module.exports = {
  getAll: () => {
    return new Promise((accepted, rejected) => {
      database.query(
        'SELECT pokedex_number, name, generation, type_1, type_2 from Pokemons',
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
  getOne: (pokedex_number) => {
    return new Promise((accepted, rejected) => {
      database.query(
        'SELECT pokedex_number, name, url, type_1, type_2, height_m, weight_kg, hp, attack, defense, sp_attack, sp_defense, speed FROM Pokemons WHERE pokedex_number = ?',
        [pokedex_number],
        (error, results) => {
          if (error) {
            rejected(error)
            return
          }
          if (results.length > 0) {
            accepted(results[0])
          } else {
            accepted(false)
          }
        }
      )
    })
  },
}
