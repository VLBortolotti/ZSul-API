const staffService = require('../services/staffService')

exports.postStaff = async (req, res, next) => {
    // const token = req.headers['token']
    const { teamId, name, dateOfBirth, documentNumber, cargo } = req.body
    const image = req.file

    const response = await staffService.postStaff(teamId, name, dateOfBirth, documentNumber, cargo, image)
    
    response.sendResponse(res)
}

exports.getAllStaffs = async (req, res, next) => {
    const response = await staffService.getAllStaffs()

    response.sendResponse(res)
}

exports.getStaffById = async (req, res, next) => {
    const { id }   = req.params
    const response = await staffService.getStaffById(id)

    response.sendResponse(res)
}

exports.getStaffsByTeamId = async (req, res, next) => {
    const { id }   = req.params
    const response = await staffService.getStaffsByTeamId(id)

    response.sendResponse(res)
}

exports.updateStaffById = async (req, res, next) => {
    const { id }           = req.params
    const { field, value } = req.body
    const response         = await staffService.updateStaffById(id, field, value)

    response.sendResponse(res)
}

exports.deleteStaffById = async (req, res, next) => {
    const { id }   = req.params
    const response = await staffService.deleteStaffById(id)

    response.sendResponse(res)
}

exports.cleanDatabase = async (req, res, next) => {
    const response = await staffService.cleanDatabase()

    response.sendResponse(res)
}