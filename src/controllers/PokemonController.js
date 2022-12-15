const PokemonService = require('../services/PokemonService')

module.exports = {
  getAll: async (_req, res) => {
    let json = { error: '', result: [] }
    let pokemons = await PokemonService.getAll()

    for (let i in pokemons) {
      json.result.push({
        pokedex_number: pokemons[i].pokedex_number,
        name: pokemons[i].name,
        generation: pokemons[i].generation,
        type1: pokemons[i].type_1,
        type2: pokemons[i].type_2,
      })
    }
    res.json(json)
  },
  getOne: async (req, res) => {
    let json = { error: '', result: {} }
    let pokedex_number = req.params.pokedex_number
    let pokemon = await PokemonService.getOne(pokedex_number)

    if (pokemon) {
      json.result = pokemon
    }
    res.json(json)
  },
}
