const express = require('express')
const router  = express.Router()
const estatisticaController = require('../controllers/estatisticaController')

router.post('/', estatisticaController.postEstatistica)
router.post('/team', estatisticaController.getEstatisticaTeamById)

router.get('/jogo/:id', estatisticaController.getEstatisticaJogoById)
router.get('/:id', estatisticaController.getEstatisticaById)
router.get('/', estatisticaController.getAllEstatisticas)

router.patch('/:id', estatisticaController.updateEstatisticaById)

router.delete('/', estatisticaController.cleanDatabase)
router.delete('/:id', estatisticaController.deleteEstatisticaById)

module.exports = router