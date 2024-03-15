const estatisticaJogadorService = require('../services/estatisticaJogadorService')

exports.postEstatisticaJogador = async (req, res, next) => {
    const { campeonatoId, jogoId, teamId, jogadorId, gols, numeroCartoesAmarelo, numeroCartoesVermelho } = req.body

    const response = await estatisticaJogadorService.postEstatisticaJogador(campeonatoId, jogoId, teamId, jogadorId, gols, numeroCartoesAmarelo, numeroCartoesVermelho)

    response.sendResponse(res)
} 

exports.getAllEstatisticasByTeamId = async (req, res, next) => {
    const { teamId, jogoId } = req.body
    const response = await estatisticaJogadorService.getAllEstatisticasByTeamId(teamId, jogoId)

    response.sendResponse(res)
}

exports.getEstatisticaJogadorById = async (req, res, next) => {
    const { jogadorId, jogoId } = req.body
    const response = await estatisticaJogadorService.getEstatisticaJogadorById(jogadorId, jogoId)

    response.sendResponse(res)
} 

exports.getAllEstatisticaByJogadorId = async (req, res, next) => {
    const { id }   = req.params
    const response = await estatisticaJogadorService.getAllEstatisticaByJogadorId(id)

    response.sendResponse(res)
} 

exports.getAllEstatisticas = async (req, res, next) => {
    const response = await estatisticaJogadorService.getAllEstatisticas()

    response.sendResponse(res)
} 

exports.getEstatisticaJogoById = async (req, res, next) => {
    const { id }   = req.params
    const response = await estatisticaJogadorService.getEstatisticaJogoById(id)

    response.sendResponse(res)
}

exports.getEstatisticaJogadorByCampeonatoId = async (req, res, next) => {
    const { id }   = req.params
    const response = await estatisticaJogadorService.getEstatisticaJogadorByCampeonatoId(id)

    response.sendResponse(res)
}

exports.updateEstatisticaById = async (req, res, next) => {
    const { field, value } = req.body
    const { id }   = req.params
    const response = await estatisticaJogadorService.updateEstatisticaById(id, field, value)
    
    response.sendResponse(res)
} 

exports.deleteEstatisticaById = async (req, res, next) => {
    const { id }   = req.params
    const response = await estatisticaJogadorService.deleteEstatisticaById(id)
    
    response.sendResponse(res)
}

exports.cleanDatabase = async (req, res, next) => {
    const response = await estatisticaJogadorService.cleanDatabase()
    
    response.sendResponse(res)
} 