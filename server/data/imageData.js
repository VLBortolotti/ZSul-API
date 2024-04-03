const Image = require('../models/ImageModel')

exports.postImage = async (userId, userType, imageField, imageName, imagePath) => {
    const image = new Image({ userId, userType, imageField, imageName, imagePath })

    return await image.save()
}

exports.getAllImages = async () => {
    return await Image.find({}, '-__v')
}

exports.getImageByUserId = async (userId, userType, imageField) => {
    return await Image.findOne({ 
        $and: [
            { userId: userId },
            { userType: userType },
            { imageField: imageField }
        ] 
    })
}

exports.updateImageByUserId = async (userId, userType, imageField, image, imageName) => {

}

exports.deleteImageById = async (id) => {
    return await Image.deleteOne({ _id: id })
}

exports.cleanDatabase = async () => {
    return await Image.deleteMany({ })
}