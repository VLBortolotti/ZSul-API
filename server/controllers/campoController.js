const campoService = require('../services/campoService')

exports.postCampo = async (req, res, next) => {
    const { nome, cidade, endereco, linkMaps } = req.body
    
    const response = await campoService.postCampo(nome, cidade, endereco, linkMaps)

    response.sendResponse(res)
}

exports.getCampoByCidade = async (req, res, next) => {
    const response = ''

    response.sendResponse(res)
}

exports.getAllCampos = async (req, res, next) => {
    const response = await campoService.getAllCampos()

    response.sendResponse(res)
}

exports.getCampoById = async (req, res, next) => {
    const response = ''

    response.sendResponse(res)
}

exports.updateCampoById = async (req, res, next) => {
    const response = ''

    response.sendResponse(res)
}

exports.deleteCampoById = async (req, res, next) => {
    const response = ''

    response.sendResponse(res)
}

exports.cleanDatabase = async (req, res, next) => {
    const response = ''

    response.sendResponse(res)
}