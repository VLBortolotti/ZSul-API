const campoService = require('../services/campoService')

exports.postCampo = async (req, res, next) => {
    const { nome, cidade, endereco, linkMaps } = req.body
    const image = req.file

    const response = await campoService.postCampo(nome, cidade, endereco, linkMaps, image)

    response.sendResponse(res)
}

exports.getCampoByCidade = async (req, res, next) => {
    const { cidade } = req.body
    const response   = await campoService.getCampoByCidade(cidade)

    response.sendResponse(res)
}

exports.getCampoByNome = async (req, res, next) => {
    const { nome } = req.body
    const response = await campoService.getCampoByNome(nome)

    response.sendResponse(res)
}

exports.getCampoByEndereco = async (req, res, next) => {
    const { endereco } = req.body
    const response = await campoService.getCampoByEndereco(endereco)

    response.sendResponse(res)
}

exports.getAllCampos = async (req, res, next) => {
    const response = await campoService.getAllCampos()

    response.sendResponse(res)
}

exports.getCampoById = async (req, res, next) => {
    const { id }   = req.params
    const response = await campoService.getCampoById(id)

    response.sendResponse(res)
}

exports.updateCampoById = async (req, res, next) => {
    const { id } = req.params
    const { field, value } = req.body
    
    const response = await campoService.updateCampoById(id, field, value)

    response.sendResponse(res)
}

exports.deleteCampoById = async (req, res, next) => {
    const { id }   = req.params
    const response = await campoService.deleteCampoById(id)

    response.sendResponse(res)
}

exports.cleanDatabase = async (req, res, next) => {
    const response = await campoService.cleanDatabase()

    response.sendResponse(res)
}