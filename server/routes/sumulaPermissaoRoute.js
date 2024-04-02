const express = require('express')
const router  = express.Router()
const sumulaPermissaoController = require('../controllers/sumulaPermissaoController')

router.get('/aprovar/:id', sumulaPermissaoController.aprovarSumulaPermissaoById)
router.get('/', sumulaPermissaoController.getAllSumulasPermissao)

router.delete('/', sumulaPermissaoController.cleanDatabase)
router.delete('/reprovar/:id', sumulaPermissaoController.reprovarSumulaPermissaoById)

module.exports = router