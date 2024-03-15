const express = require('express')
const router  = express.Router()
const upload  = require("../config/multer")
const campeonatoController = require('../controllers/campeonatoController')

router.post('/', upload.single("file"), campeonatoController.postCampeonato)

router.get('/', campeonatoController.getAllCampeonatos)
router.get('/:id', campeonatoController.getCampeonatoById)

router.patch('/:id', campeonatoController.updateCampeonatoById)

router.delete('/', campeonatoController.cleanDatabase)
router.delete('/:id', campeonatoController.deleteCampeonatoById)

module.exports = router