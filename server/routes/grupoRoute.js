const { ensureAuthorization } = require('../middlewares/ensureAuthentication')
const express          = require('express')
const grupoController  = require('../controllers/grupoController')
const router           = express.Router()

router.post('/', grupoController.postGrupo)

router.get('/team/grupo/:id', grupoController.getAllTeamsByGrupoId) // todos os times do grupo (por seu id)
router.post('/team', grupoController.postGrupoTime)
router.get('/team/:id', grupoController.getGruposByTeamId) // todos grupos em que o time esta

router.get('/campeonato/:id', grupoController.getGruposByCampeonatoId) // todos grupos do campeonato
router.get('/:id', grupoController.getGrupoById) // grupo por seu proprio id
router.get('/', grupoController.getAllGrupos) // todos os grupos (sem utilidade)

router.patch('/:id', grupoController.updateGrupoById) // atualizar GRUPO 

router.delete('/grupo', grupoController.deleteTeamByGrupoId)
router.delete('/', grupoController.cleanDatabase)
router.delete('/:id', grupoController.deleteGrupoById)

module.exports = router