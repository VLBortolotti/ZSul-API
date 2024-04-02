const transferenciaService = require('../services/transferenciaService')

exports.postTransferencia = async (req, res, next) => {
    const { jogadorId, novoTimeId, motivo, dataDeSolicitacao } = req.body

    const response = await transferenciaService.postTransferencia(jogadorId, novoTimeId, motivo, dataDeSolicitacao)

    response.sendResponse(res)
}

exports.aprovarTransferenciaById = async (req, res, next) => {
    const { id }   = req.params
    const response = await transferenciaService.aprovarTransferenciaById(id)

    response.sendResponse(res)
}

exports.getAllTransferencias = async (req, res, next) => {
    const response = await transferenciaService.getAllTransferencias()

    response.sendResponse(res)
}

exports.reprovarTransferenciaById = async (req, res, next) => {
    const { id }   = req.params
    const response = await transferenciaService.reprovarTransferenciaById(id)

    response.sendResponse(res)
}

exports.cleanDatabase = async (req, res, next) => {
    const response = await transferenciaService.cleanDatabase()

    response.sendResponse(res)
}