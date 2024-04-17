const express = require('express')
const router  = express.Router()
const fotografoController = require('../controllers/fotografoController')

router.post('/', fotografoController.postFotografo)

router.get('/', fotografoController.getAllFotografos)
router.get('/:id', fotografoController.getFotografoById)

router.patch('/nome', fotografoController.getFotografoByNome)
router.patch('/:id', fotografoController.updateFotografoById)

router.delete('/', fotografoController.cleanDatabase)
router.delete('/:id', fotografoController.deleteFotografoById)

module.exports = router