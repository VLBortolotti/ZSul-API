const estatisticaService = require('../services/estatisticaService')

exports.postEstatistica = async (req, res, next) => {
    const { campeonatoId, jogoId, userCasaGols, userForaGols } = req.body

    const response = await estatisticaService.postEstatistica(campeonatoId, jogoId, userCasaGols, userForaGols)

    response.sendResponse(res)
} 

exports.getEstatisticaJogoById = async (req, res, next) => {
    const { id }   = req.params
    const response = await estatisticaService.getEstatisticaJogoById(id)

    response.sendResponse(res)
} 

exports.getEstatisticaTeamById = async (req, res, next) => {
    const { campeonatoId, teamId } = req.body
    const response = await estatisticaService.getEstatisticaTeamById(campeonatoId, teamId)

    response.sendResponse(res)
} 

exports.getEstatisticaById = async (req, res, next) => {
    const { id }   = req.params
    const response = await estatisticaService.getEstatisticaById(id)

    response.sendResponse(res)
} 

exports.getAllEstatisticas = async (req, res, next) => {
    const response = await estatisticaService.getAllEstatisticas()

    response.sendResponse(res)
}

exports.updateEstatisticaById = async (req, res, next) => {
    const { field, value } = req.body
    const { id }   = req.params
    const response = await estatisticaService.updateEstatisticaById(id, field, value)

    response.sendResponse(res)
} 

exports.deleteEstatisticaById = async (req, res, next) => {
    const { id }   = req.params
    const response = await estatisticaService.deleteEstatisticaById(id)

    response.sendResponse(res)
} 

exports.cleanDatabase = async (req, res, next) => {
    const response = await estatisticaService.cleanDatabase()

    response.sendResponse(res)
} 