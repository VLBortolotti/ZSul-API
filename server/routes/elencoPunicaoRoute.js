const { ensureAuthorization } = require('../middlewares/ensureAuthentication')
const elencoPunicaoController = require('../controllers/elencoPunicaoController')
const express = require('express')
const router  = express.Router()

router.post('/', elencoPunicaoController.postPunicao)
// router.post('/filter', elencoPunicaoController.getUsersByFilter)

router.get('/', elencoPunicaoController.getAllPunicao)
router.get('/:id', elencoPunicaoController.getPunicaoById)
router.get('/team/:id', elencoPunicaoController.getPunicaoByTeamId)
router.get('/campeonato/:id', elencoPunicaoController.getPunicaoByCampeonatoId)

router.patch('/:id', elencoPunicaoController.updateAthleteById)

router.delete('/', elencoPunicaoController.cleanDatabase)
router.delete('/:id', elencoPunicaoController.deleteAthleteById)

module.exports = router