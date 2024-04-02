const elencoService = require('../services/elencoService')

exports.postAthlete = async (req, res, next) => {
    const { teamId, name, dateOfBirth, documentNumber, school, currentDate } = req.body

    const response = await elencoService.postAthlete(teamId, name, dateOfBirth, documentNumber, school, currentDate)
    
    response.sendResponse(res)
}

exports.getAllAthletes = async (req, res, next) => {
    const response = await elencoService.getAllAthletes()

    response.sendResponse(res)
}

exports.getAthleteById = async (req, res, next) => {
    const { id }   = req.params
    const response = await elencoService.getAthleteById(id)

    response.sendResponse(res)
}

exports.getAthletesByTeamId = async (req, res, next) => {
    const { id }   = req.params
    const response = await elencoService.getAthletesByTeamId(id)

    response.sendResponse(res)
}

exports.getAthleteByCertidaoId = async (req, res, next) => {
    const { certidao } = req.params
    const response     = await elencoService.getAthleteByCertidaoId(certidao)

    response.sendResponse(res)
}

exports.updateAthleteById = async (req, res, next) => {
    const { id }           = req.params
    const { field, value } = req.body
    const response         = await elencoService.updateAthleteById(id, field, value)

    response.sendResponse(res)
}

exports.deleteAthleteById = async (req, res, next) => {
    const { id }   = req.params
    const response = await elencoService.deleteAthleteById(id)

    response.sendResponse(res)
}

exports.cleanDatabase = async (req, res, next) => {
    const response = await elencoService.cleanDatabase()

    response.sendResponse(res)
}