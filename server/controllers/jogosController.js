const jogosService = require('../services/jogosService')

exports.postJogo = async (req, res, next) => {
    const { campeonatoId, userIdCasa, userIdFora, grupoId, tipo, data, hora, local } = req.body

    const response = await jogosService.postJogo(campeonatoId, userIdCasa, userIdFora, grupoId, tipo, data, hora, local)

    response.sendResponse(res)
}

exports.getAllJogos = async (req, res, next) => {
    const response = await jogosService.getAllJogos()

    response.sendResponse(res)
}

exports.getJogoById = async (req, res, next) => {
    const { id }   = req.params
    const response = await jogosService.getJogoById(id)

    response.sendResponse(res)
}

exports.getJogoCampeonatoById = async (req, res, next) => {
    const { id }   = req.params
    const response = await jogosService.getJogoCampeonatoById(id)

    response.sendResponse(res)
}

exports.getJogoGrupoById = async (req, res, next) => {
    const { id }   = req.params
    const response = await jogosService.getJogoGrupoById(id)

    response.sendResponse(res)
}

exports.getJogoTeamById = async (req, res, next) => {
    const { id }   = req.params
    const response = await jogosService.getJogoTeamById(id)

    response.sendResponse(res)
}

exports.updateJogoById = async (req, res, next) => {
    const { field, value } = req.body
    const { id }   = req.params
    const response = await jogosService.updateJogoById(id, field, value)

    response.sendResponse(res)
}

exports.deleteJogoById = async (req, res, next) => {
    const { id }   = req.params
    const response = await jogosService.deleteJogoById(id)

    response.sendResponse(res)
}

exports.cleanDatabase = async (req, res, next) => {
    const response = await jogosService.cleanDatabase()

    response.sendResponse(res)
}