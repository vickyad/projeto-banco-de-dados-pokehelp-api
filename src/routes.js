const express = require('express')
const PokemonController = require('./controllers/PokemonController')
const TeamController = require('./controllers/TeamController')
const ChartsController = require('./controllers/ChartsController')

const router = express.Router()

router.get('/pokemons', PokemonController.getAll)
router.get('/pokemon/:pokedex_number', PokemonController.getOne)
router.get('/teams', TeamController.getAll)
router.get('/team/:team_id', TeamController.getOne)
router.post('/team', TeamController.insert)
router.put('/team/:team_id', TeamController.edit)
router.delete('/team/:team_id', TeamController.delete)

router.get('/analysis/types', ChartsController.types)
router.get('/analysis/type_combinations', ChartsController.typeCombination)
router.get('/analysis/common_moves', ChartsController.commonMoves)
module.exports = router
