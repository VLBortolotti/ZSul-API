const express          = require('express')
const campoController  = require('../controllers/campoController')
const router           = express.Router()
const upload  = require("../config/multer")

router.post('/', upload.single("file"), campoController.postCampo)

router.patch('/cidade', campoController.getCampoByCidade)
router.patch('/nome', campoController.getCampoByNome)
router.patch('/endereco', campoController.getCampoByEndereco)

router.get('/', campoController.getAllCampos)
router.get('/:id', campoController.getCampoById)

router.patch('/:id', campoController.updateCampoById)

router.delete('/', campoController.cleanDatabase)
router.delete('/:id', campoController.deleteCampoById)

module.exports = router