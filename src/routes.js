const express = require('express')
const PokemonController = require('./controllers/PokemonController')
const TeamController = require('./controllers/TeamController')

const router = express.Router()

router.get('/pokemons', PokemonController.getAll)
router.get('/pokemon/:pokedex_number', PokemonController.getOne)
router.get('/teams', TeamController.getAll)
router.get('/team/:team_id', TeamController.getOne)
router.post('/team', TeamController.insert)
module.exports = router
