const PokemonService = require('../services/PokemonService')

module.exports = {
  getAll: async (_req, res) => {
    let json = { error: '', result: [] }
    let pokemons = await PokemonService.getAll()

    for (let i in pokemons) {
      json.result.push({
        pokemon_id: pokemons[i].pokemon_id,
        pokedex_number: pokemons[i].pokedex_number,
        name: pokemons[i].name,
        url: pokemons[i].url,
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
      json.result = {
        pokedex_number: pokemon.pokedex_number,
        name: pokemon.name,
        url: pokemon.url,
        height_m: pokemon.height_m,
        weight_kg: pokemon.weight_kg,
        types: [pokemon.type_1, pokemon.type_2],
        stats: [
          { name: 'hp', value: pokemon.hp },
          { name: 'attack', value: pokemon.attack },
          { name: 'defense', value: pokemon.defense },
          { name: 'sp. attack', value: pokemon.sp_attack },
          { name: 'sp. defense', value: pokemon.sp_defense },
          { name: 'speed', value: pokemon.speed },
        ],
      }
    }
    res.json(json)
  },
}
