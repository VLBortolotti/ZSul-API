const grupoService = require('../services/grupoService')

exports.postGrupo = async (req, res, next) => {
    const { name, campeonatoId } = req.body

    const response = await grupoService.postGrupo(name, campeonatoId)

    response.sendResponse(res)    
}

exports.postGrupoTime = async (req, res, next) => {
    const { userId, grupoId } = req.body
    const response = await grupoService.postGrupoTime(userId, grupoId)

    response.sendResponse(res)
}

exports.getAllGrupos = async (req, res, next) => {
    const response = await grupoService.getAllGrupos()

    response.sendResponse(res)    
}

exports.getAllTeamsByGrupoId = async (req, res, next) => {
    const { id }   = req.params
    const response = await grupoService.getAllTeamsByGrupoId(id)
    
    response.sendResponse(res)
}

exports.getGrupoById = async (req, res, next) => {
    const { id }   = req.params
    const response = await grupoService.getGrupoById(id)

    response.sendResponse(res)   
}

exports.getGruposByTeamId = async (req, res, next) => {
    const { id }   = req.params
    const response = await grupoService.getGruposByTeamId(id)

    response.sendResponse(res) 
}

exports.getGruposByCampeonatoId = async (req, res, next) => {
    const { id } = req.params
    const response = await grupoService.getGruposByCampeonatoId(id)

    response.sendResponse(res)   
}

exports.updateGrupoById = async (req, res, next) => {
    const { id } = req.params
    const { field, value } = req.body
    const response = await grupoService.updateGrupoById(id, field, value)

    response.sendResponse(res) 
}

exports.deleteGrupoById = async (req, res, next) => {
    const { id }   = req.params
    const response = await grupoService.deleteGrupoById(id)

    response.sendResponse(res) 
}

exports.deleteTeamByGrupoId = async (req, res, next) => {
    const { teamId, grupoId } = req.body
    
    const response = await grupoService.deleteTeamByGrupoId(teamId, grupoId)

    response.sendResponse(res)
}

exports.cleanDatabase = async (req, res, next) => {
    const response = await grupoService.cleanDatabase()

    response.sendResponse(res) 
}