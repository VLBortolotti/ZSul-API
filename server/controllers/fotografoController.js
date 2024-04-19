const fotografoService = require('../services/fotografoService')

exports.postFotografo = async (req, res, next) => {
    const { titulo, foto, tipoFoto, nome, instagram } = req.body

    const response = await fotografoService.postFotografo(titulo, foto, tipoFoto, nome, instagram)

    response.sendResponse(res)
}

exports.getFotografoByNome = async (req, res, next) => {
    const { nome } = req.body
    const response = await fotografoService.getFotografoByNome(nome)

    response.sendResponse(res)
}

exports.getAllFotografos = async (req, res, next) => {
    const response = await fotografoService.getAllFotografos()

    response.sendResponse(res)
}

exports.getFotografoById = async (req, res, next) => {
    const { id }   = req.params
    const response = await fotografoService.getFotografoById(id)

    response.sendResponse(res)
}

exports.updateFotografoById = async (req, res, next) => {
    const { id } = req.params
    const { field, value } = req.body

    const response = await fotografoService.updateFotografoById(id, field, value)

    response.sendResponse(res)
}

exports.deleteFotografoById = async (req, res, next) => {
    const { id }   = req.params
    const response = await fotografoService.deleteFotografoById(id)

    response.sendResponse(res)
}

exports.cleanDatabase = async (req, res, next) => {
    const response = await fotografoService.cleanDatabase()
 
    response.sendResponse(res)
}