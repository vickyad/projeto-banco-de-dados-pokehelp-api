const database = require('../database')

module.exports = {
  getAll: (pokemon_id) => {
    return new Promise((accepted, rejected) => {
      database.query(
        'SELECT pokedex.moves.move_id, pokedex.moves.name, pokedex.moves.type, pokedex.moves.category, pokedex.moves.power, pokedex.moves.accuracy, pokedex.moves.pp, pokedex.moves.description FROM pokedex.moves INNER JOIN pokedex.pokemons_moves ON pokedex.pokemons_moves.move_id = pokedex.moves.move_id WHERE pokedex.pokemons_moves.pokemon_id = ?',
        [pokemon_id],
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
