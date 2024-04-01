const { ensureAuthorization } = require('../middlewares/ensureAuthentication')
const express             = require('express')
const elencoController    = require('../controllers/elencoController')
const router              = express.Router()

router.post('/', elencoController.postAthlete)
// router.post('/filter', elencoController.getUsersByFilter)

router.get('/', elencoController.getAllAthletes)
router.get('/:id', elencoController.getAthleteById)
router.get('/team/:id', elencoController.getAthletesByTeamId)
router.get('/certidao/:certidao', elencoController.getAthleteByCertidaoId)

router.patch('/:id', elencoController.updateAthleteById)

router.delete('/', elencoController.cleanDatabase)
router.delete('/:id', elencoController.deleteAthleteById)

module.exports = router