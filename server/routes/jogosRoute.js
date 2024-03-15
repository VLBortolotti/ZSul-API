const express = require('express')
const router  = express.Router()
const jogosController = require('../controllers/jogosController')

router.post('/', jogosController.postJogo)

router.get('/campeonato/:id', jogosController.getJogoCampeonatoById)
router.get('/grupo/:id', jogosController.getJogoGrupoById)
router.get('/team/:id', jogosController.getJogoTeamById)
router.get('/', jogosController.getAllJogos)
router.get('/:id', jogosController.getJogoById)

router.patch('/:id', jogosController.updateJogoById)

router.delete('/', jogosController.cleanDatabase)
router.delete('/:id', jogosController.deleteJogoById)

module.exports = router