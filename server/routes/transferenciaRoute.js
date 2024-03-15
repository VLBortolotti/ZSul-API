const express = require('express')
const router  = express.Router()
const transferenciaController = require('../controllers/transferenciaController')

router.post('/', transferenciaController.postTransferencia)

//router.get('/jogo/:id', transferenciaController.getTransferenciaJogoById)
//router.get('/team/:id', transferenciaController.getTransferenciaTeamById)
//router.get('/:id', transferenciaController.getTransferenciaById)
router.get('/', transferenciaController.getAllTransferencias)

//router.patch('/:id', transferenciaController.updateTransferenciaById)

router.delete('/', transferenciaController.cleanDatabase)
router.delete('/:id', transferenciaController.reprovarTransferenciaById)

module.exports = router