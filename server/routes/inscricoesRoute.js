const express = require('express')
const router  = express.Router()
const inscricoesController = require('../controllers/inscricoesController')

router.post('/', inscricoesController.postInscricao)

router.get('/', inscricoesController.getAllInscricoes)
router.get('/:id', inscricoesController.getInscricaoById)
router.get('/campeonato/:id', inscricoesController.getInscricoesByCampeonatoId)
router.get('/user/:id', inscricoesController.getInscricoesByUserId)

router.patch('/:id', inscricoesController.updateInscricaoById)

router.delete('/', inscricoesController.cleanDatabase)
router.delete('/:id', inscricoesController.deleteInscricaoById)

module.exports = router