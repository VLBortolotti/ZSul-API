const express = require('express')
const router  = express.Router()
const estatisticaJogadorController = require('../controllers/estatisticaJogadorController')

router.post('/', estatisticaJogadorController.postEstatisticaJogador)

router.patch('/team', estatisticaJogadorController.getAllEstatisticasByTeamId)
router.patch('/jogador', estatisticaJogadorController.getEstatisticaJogadorById)

router.get('/campeonato/:id', estatisticaJogadorController.getEstatisticaJogadorByCampeonatoId)
router.get('/jogo/:id', estatisticaJogadorController.getEstatisticaJogoById)
router.get('/punidos', estatisticaJogadorController.getAllEstatisticasJogadoresPunidos)
router.get('/all', estatisticaJogadorController.getAllEstatisticas)
router.get('/:id', estatisticaJogadorController.getAllEstatisticaByJogadorId)

router.patch('/:id', estatisticaJogadorController.updateEstatisticaById)

router.delete('/clean', estatisticaJogadorController.cleanDatabase)
router.delete('/:id', estatisticaJogadorController.deleteEstatisticaById)

module.exports = router