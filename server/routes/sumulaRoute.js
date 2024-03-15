const express = require('express')
const router  = express.Router()
const sumulaController = require('../controllers/sumulaController')

router.post('/', sumulaController.postSumula)

router.get('/campeonato/:id', sumulaController.getSumulaByCampeonatoId)
router.get('/team/:id', sumulaController.getSumulaByTeamId)
router.get('/elenco/:id', sumulaController.getSumulaByElencoId)
router.get('/', sumulaController.getAllSumulas)
router.get('/:id', sumulaController.getSumulaById)

router.patch('/preco', sumulaController.precoSumulaByTeamAndCampeonatoId)
router.patch('/:id', sumulaController.updateSumulaById)

router.delete('/', sumulaController.cleanDatabase)
router.delete('/:id', sumulaController.deleteSumulaById)

module.exports = router