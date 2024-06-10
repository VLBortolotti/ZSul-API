const elencoPunicaoService = require('../services/elencoPunicaoService')

exports.postPunicao = async (req, res, next) => {
    const { teamId, elencoId, campeonatoId, punicao, descricao } = req.body

    const response = await elencoPunicaoService.postPunicao(teamId, elencoId, campeonatoId, punicao, descricao)

    response.sendResponse(res)
}

exports.getAllPunicao = async (req, res, next) => {
    const response = await elencoPunicaoService.getAllPunicao()

    response.sendResponse(res)
}

exports.getPunicaoById = async (req, res, next) => {
    const { id }   = req.params
    const response = await elencoPunicaoService.getPunicaoById(id)

    response.sendResponse(res)
}

exports.getPunicaoByTeamId = async (req, res, next) => {
    const { id }   = req.params
    const response = await elencoPunicaoService.getPunicaoByTeamId(id)

    response.sendResponse(res)
}

exports.getPunicaoByCampeonatoId = async (req, res, next) => {
    const { id }   = req.params
    const response = await elencoPunicaoService.getPunicaoByCampeonatoId(id)

    response.sendResponse(res)
}

exports.updateAthleteById = async (req, res, next) => {
    const { field, value } = req.body
    const { id }   = req.params
    const response = await elencoPunicaoService.updateAthleteById(id, field, value)

    response.sendResponse(res)
}

exports.deleteAthleteById = async (req, res, next) => {
    const { id }   = req.params
    const response = await elencoPunicaoService.deleteAthleteById(id)

    response.sendResponse(res)
}

exports.cleanDatabase = async (req, res, next) => {
    const response = await elencoPunicaoService.cleanDatabase()

    response.sendResponse(res)
}