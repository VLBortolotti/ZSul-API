const { ensureAuthorization } = require('../middlewares/ensureAuthentication')
const elencoPunicaoController = require('../controllers/elencoPunicaoController')
const express = require('express')
const router  = express.Router()

router.post('/', elencoPunicaoController.postAthlete)
// router.post('/filter', elencoPunicaoController.getUsersByFilter)

router.get('/', elencoPunicaoController.getAllAthletes)
router.get('/:id', elencoPunicaoController.getAthleteById)
router.get('/team/:id', elencoPunicaoController.getAthletesByTeamId)
router.get('/certidao/:certidao', elencoPunicaoController.getAthleteByCertidaoId)

router.patch('/:id', elencoPunicaoController.updateAthleteById)

router.delete('/', elencoPunicaoController.cleanDatabase)
router.delete('/:id', elencoPunicaoController.deleteAthleteById)

module.exports = router