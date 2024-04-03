const elencoStatusController = require('../services/elencoStatusService')

exports.postElencoStatus = async (req, res, next) => {
    const { status } = req.body
    const response   = await elencoStatusController.postElencoStatus(status)

    response.sendResponse(res)
}

exports.getElencoStatus = async (req, res, next) => {
    const response = await elencoStatusController.getElencoStatus()

    response.sendResponse(res)
}

exports.updateElencoStatus = async (req, res, next) => {
    const { status } = req.body
    const response   = await elencoStatusController.updateElencoStatus(status)

    response.sendResponse(res)
}

exports.deleteElencoStatus = async (req, res, next) => {
    const response = await elencoStatusController.deleteElencoStatus()

    response.sendResponse(res)
}