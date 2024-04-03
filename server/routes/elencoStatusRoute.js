const { ensureAuthorization } = require('../middlewares/ensureAuthentication')
const elencoStatusController  = require('../controllers/elencoStatusController')
const express = require('express')
const router  = express.Router()

router.post('/', elencoStatusController.postElencoStatus)
// router.post('/filter', elencoStatusController.getUsersByFilter)

router.get('/', elencoStatusController.getElencoStatus)

router.patch('/', elencoStatusController.updateElencoStatus)

router.delete('/', elencoStatusController.deleteElencoStatus)

module.exports = router