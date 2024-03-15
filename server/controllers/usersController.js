const usersService = require('../services/usersService')

exports.postUser = async (req, res, next) => {
    const { teamName, email, password, confirmPassword, city, state } = req.body

    const response = await usersService.postUser(teamName, email, password, confirmPassword, city, state)
    response.sendResponse(res)
}

exports.postUserAdmin = async (req, res, next) => {
    const { userId, teamName, email, password, confirmPassword, city, state } = req.body

    const response = await usersService.postUser(userId, teamName, email, password, confirmPassword, city, state)
    response.sendResponse(res)
}

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body

    const response = await usersService.loginUser(email, password)
    response.sendResponse(res)
}

exports.getAllUsers = async (req, res, next) => {
    const response = await usersService.getAllUsers()

    response.sendResponse(res)
}

exports.getUserById = async (req, res, next) => {
    const { id }   = req.params
    const response = await usersService.getUserById(id)

    response.sendResponse(res)
}

exports.updateUserById = async (req, res, next) => {
    const { id }            = req.params
    const { field, value }  = req.body
    const response  = await usersService.updateUserById(id, field, value)

    response.sendResponse(res)
}

exports.deleteUserById = async (req, res, next) => {
    const { id }   = req.params
    const response = await usersService.deleteUserById(id)

    response.sendResponse(res)
}

exports.cleanDatabase = async (req, res, next) => {
    const response = await usersService.cleanDatabase()

    response.sendResponse(res)
}