const sumulaService = require('../services/sumulaService')

exports.postSumula = async (req, res, next) => {
    const { campeonatoId, userId, elencoId, status } = req.body
    
    const response = await sumulaService.postSumula(campeonatoId, userId, elencoId, status)

    response.sendResponse(res)
}

exports.getAllSumulas = async (req, res, next) => {
    const response = await sumulaService.getAllSumulas()

    response.sendResponse(res)
}

exports.getSumulaById = async (req, res, next) => {
    const { id }   = req.params
    const response = await sumulaService.getSumulaById(id)

    response.sendResponse(res)
}

exports.getSumulaByCampeonatoId = async (req, res, next) => {
    const { id }   = req.params
    const response = await sumulaService.getSumulaByCampeonatoId(id)

    response.sendResponse(res)
}

exports.getSumulaByTeamId = async (req, res, next) => {
    const { id }   = req.params
    const response = await sumulaService.getSumulaByTeamId(id)

    response.sendResponse(res)
}

exports.getSumulaByElencoId = async (req, res, next) => {
    const { id }   = req.params
    const response = await sumulaService.getSumulaByElencoId(id)

    response.sendResponse(res)
}

exports.precoSumulaByTeamAndCampeonatoId = async (req, res, next) => {
    const { p1, p2, p3, teamId, campeonatoId } = req.body

    const response = await sumulaService.precoSumulaByTeamAndCampeonatoId(p1, p2, p3, teamId, campeonatoId)

    response.sendResponse(res)
}

exports.updateSumulaById = async (req, res, next) => {
    const { field, value } = req.body
    const { id }   = req.params
    const response = await sumulaService.updateSumulaById(id, field, value)

    response.sendResponse(res)
}

exports.deleteSumulaById = async (req, res, next) => {
    const { id }   = req.params
    const response = await sumulaService.deleteSumulaById(id)

    response.sendResponse(res)
}

exports.cleanDatabase = async (req, res, next) => {
    const response = await sumulaService.cleanDatabase()

    response.sendResponse(res)
}