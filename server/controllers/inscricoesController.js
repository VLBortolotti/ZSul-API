const inscricoesService = require('../services/inscricoesService')

exports.postInscricao = async (req, res, next) => {
    const { userId, campeonatoId } = req.body

    const response = await inscricoesService.postInscricao(userId, campeonatoId)
    response.sendResponse(res)
}

exports.getAllInscricoes = async (req, res, next) => {
    const response = await inscricoesService.getAllInscricoes()

    response.sendResponse(res)
}

exports.getInscricaoById = async (req, res, next) => {
    const { id }   = req.params
    const response = await inscricoesService.getInscricaoById(id)

    response.sendResponse(res)
}

exports.getInscricoesByCampeonatoId = async (req, res, next) => {
    const { id }   = req.params
    const response = await inscricoesService.getInscricoesByCampeonatoId(id)

    response.sendResponse(res)
}

exports.getInscricoesByUserId = async (req, res, next) => {
    const { id }   = req.params
    const response = await inscricoesService.getInscricoesByUserId(id)

    response.sendResponse(res)
}

exports.updateInscricaoById = async (req, res, next) => {
    const { id } = req.params
    const { field, value } = req.body
    
    const response = await inscricoesService.updateInscricaoById(id, field, value)

    response.sendResponse(res)
}

exports.deleteInscricaoById = async (req, res, next) => {
    const { id }   = req.params
    const response = await inscricoesService.deleteInscricaoById(id)

    response.sendResponse(res)
}

exports.cleanDatabase = async (req, res, next) => {
    const response = await inscricoesService.cleanDatabase()

    response.sendResponse(res)
}