const express          = require('express')
const campoController  = require('../controllers/campoController')
const router           = express.Router()
const upload  = require("../config/multer")

router.post('/', campoController.postCampo)

router.get('/cidade', campoController.getCampoByCidade)
router.get('/', campoController.getAllCampos)
router.get('/:id', campoController.getCampoById)

router.patch('/:id', campoController.updateCampoById)

router.delete('/', campoController.cleanDatabase)
router.delete('/:id', campoController.deleteCampoById)

module.exports = router