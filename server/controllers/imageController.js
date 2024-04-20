const imageService = require('../services/imageService')

exports.postImage = async (req, res, next) => {
    const { userId, userType, imageField } = req.body
    const image = req.file

    const response = await imageService.postImage(userId, userType, imageField, image)
    response.sendResponse(res) 
}

exports.getAllImages = async (req, res, next) => {
    const response = await imageService.getAllImages()
    
    response.sendResponse(res)
}

exports.getImageByUserId = async (req, res, next) => {
    const { userId, userType, imageField } = req.body

    const response = await imageService.getImageByUserId(userId, userType, imageField)
    res.status(response.status).sendFile(response.data)
}

exports.getImageBlob = async (req, res, next) => {
    const { userId, userType, imageField } = req.body

    const response = await imageService.getImageBlob(userId, userType, imageField)
    console.log(`response: ${JSON.stringify(response)}`)
    response.sendResponse(res)
}

exports.updateImageByUserId = async (req, res, next) => {

}

exports.deleteImageById = async (req, res, next) => {
    const { id } = req.params
    const response = await imageService.deleteImageByUserId(id)

    response.sendResponse(res)
}

exports.cleanDatabase = async (req, res, next) => {
    const response = await imageService.cleanDatabase()

    response.sendResponse(res)
}