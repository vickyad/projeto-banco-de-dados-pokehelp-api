const express = require('express')

const router = express.Router()
const PokemonController = require('./controllers/PokemonController')
router.get('/pokemon', PokemonController.getAll)
router.get('/pokemon/:pokedex_number', PokemonController.getOne)
module.exports = router
