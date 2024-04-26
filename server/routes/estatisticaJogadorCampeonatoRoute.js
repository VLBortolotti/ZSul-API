const express = require('express')
const router  = express.Router()
const estatisticaJogadorCampeonatoController = require('../controllers/estatisticaJogadorCampeonatoController')

// router.post('/', estatisticaJogadorCampeonatoController.postEstatisticaJogadorCampeonato)

router.patch('/time', estatisticaJogadorCampeonatoController.getEstatisticaJogadorCampeonatoByTeamId)
router.patch('/jogador', estatisticaJogadorCampeonatoController.getEstatisticaJogadorCampeonatoByJogadorId)

router.get('/campeonato/:id', estatisticaJogadorCampeonatoController.getEstatisticaJogadorByCampeonatoId)
router.get('/all', estatisticaJogadorCampeonatoController.getAllEstatisticaJogadorCampeonato)
router.get('/:id', estatisticaJogadorCampeonatoController.getEstatisticaJogadorCampeonatoById)

router.patch('/:id', estatisticaJogadorCampeonatoController.updateEstatisticaJogadorCampeonatoById)

router.delete('/clean', estatisticaJogadorCampeonatoController.cleanDatabase)
router.delete('/:id', estatisticaJogadorCampeonatoController.deleteEstatisticaJogadorCampeonatoById)

module.exports = router