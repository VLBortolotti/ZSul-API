const campeonatoService = require('../services/campeonatoService')

exports.postCampeonato = async (req, res, next) => {
    const { name, categoria, participantes, vagas, quantidadeGrupos, dataInicio, cidade, tipoCompeticao, tipoGrupo, tipoMataMata } = req.body
    const image = req.file

    const response = await campeonatoService.postCampeonato(name, categoria, participantes, vagas, quantidadeGrupos, dataInicio, cidade, tipoCompeticao, tipoGrupo, tipoMataMata, image)
    response.sendResponse(res)
}

exports.getAllCampeonatos = async (req, res, next) => {
    const response = await campeonatoService.getAllCampeonatos()
    response.sendResponse(res)
}

exports.getCampeonatoById = async (req, res, next) => {
    const { id }   = req.params
    const response = await campeonatoService.getCampeonatoById(id)
    
    response.sendResponse(res)
}

exports.updateCampeonatoById = async (req, res, next) => {
    const { id } = req.params
    const { field, value } = req.body
    const response = await campeonatoService.updateCampeonatoById(id, field, value)

    response.sendResponse(res)
}

exports.deleteCampeonatoById = async (req, res, next) => {
    const { id }   = req.params
    const response = await campeonatoService.deleteCampeonatoById(id)

    response.sendResponse(res)
}

exports.cleanDatabase = async (req, res, next) => {
    const response = await campeonatoService.cleanDatabase()

    response.sendResponse(res)
}