const sumulaPermissaoController = require('../services/sumulaPermissaoService')

exports.aprovarSumulaPermissaoById = async (req, res, next) => {
    const { id }   = req.params
    const response = await sumulaPermissaoController.aprovarSumulaPermissaoById(id)
    
    response.sendResponse(res)
}

exports.getAllSumulasPermissao = async (req, res, next) => {
    const response = await sumulaPermissaoController.getAllSumulasPermissao()

    response.sendResponse(res)
}

exports.reprovarSumulaPermissaoById = async (req, res, next) => {
    const { id }   = req.params
    const response = await sumulaPermissaoController.reprovarSumulaPermissaoById(id)
    
    response.sendResponse(res)
}

exports.cleanDatabase = async (req, res, next) => {
    const response = await sumulaPermissaoController.cleanDatabase(id)
    
    response.sendResponse(res)
}