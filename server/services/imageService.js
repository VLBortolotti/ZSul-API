const fs = require('fs')
const secret          = process.env.SECRET
const { ResponseDTO } = require('../dtos/Response')
const ObjectId        = require('mongoose').Types.ObjectId;
const usersData       = require('../data/usersData')
const staffData       = require('../data/staffData')
const elencoData      = require('../data/elencoData')
const imageData       = require('../data/imageData')

exports.postImage = async (userId, userType, imageField, image) => {
    try {
        if (!userId) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário não preenchido')
        }

        if (!ObjectId.isValid(userId)) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário não é válido')
        }

        // Verificando tipo do usuario (user, staff, elenco)
        if (!userType) {
            return new ResponseDTO('Error', 400, 'Tipo do usuário não preenchido')
        }

        // Verificando imagem
        if (!imageField) {
            return new ResponseDTO('Error', 400, 'Campo ao qual a imagem pertence não preenchido')
        }

        if (!image) {
            return new ResponseDTO('Error', 400, 'Imagem não preenchida')
        }

        const imagePath = image.path
        const imageName = image.filename

        // Determinando qual o tipo do usuario
        if (userType === 'elenco') {
            const user = await elencoData.getAthleteById(userId)

            if (!user) {
                return new ResponseDTO('Error', 404, 'Usuário com este identificador não existente')
            }

            const imageFieldBase64 = imageField + 'Base64'

            const data = fs.readFileSync(image.path)
            const dataUrl = `data:image/png;base64,${data.toString('base64')}`

            user[imageField] = imageName
            user[imageFieldBase64] = dataUrl

            await user.validate()
            await user.save()
        
            const response = await elencoData.getAthleteById(userId)

            return new ResponseDTO('Success', 200, 'ok', response)
        }

        if (userType === 'user') {
            const user = await usersData.getUserById(userId)

            if (!user) {
                return new ResponseDTO('Error', 404, 'Usuário com este identificador não existente')
            }

            const data = fs.readFileSync(image.path)
            const dataUrl = `data:image/png;base64,${data.toString('base64')}`

            user[imageField]   = imagePath
            user.pictureBase64 = dataUrl

            await user.validate()
            await user.save()
        
            const response = await usersData.getUserById(userId)

            return new ResponseDTO('Success', 200, 'ok', response)
        }

        if (userType === 'staff') {
            const user = await staffData.getStaffById(userId)

            if (!user) {
                return new ResponseDTO('Error', 404, 'Usuário com este identificador não existente')
            }

            const data = fs.readFileSync(image.path)
            const dataUrl = `data:image/png;base64,${data.toString('base64')}`

            user[imageField]     = imagePath
            user.fotoStaffBase64 = dataUrl

            await user.validate()
            await user.save()
        
            const response = await staffData.getStaffById(userId)

            return new ResponseDTO('Success', 200, 'ok', response)
        }

        // const response = await imageData.postImage(userId, userType, imageField, imageName, imagePath)

        // return new ResponseDTO('Success', 200, 'Ok', response)

    } catch(error) {
        console.log(`Error: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllImages = async () => {
    try {
        const response = await imageData.getAllImages()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Error: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getImageByUserId = async (userId, userType, imageField) => {
    try {
        // Campo da imagem (RGFrente, RGVersom ...)
        if (!imageField) {
            return new ResponseDTO('Error', 400, 'Campo da imagem não preenchido')
        }

        // Identificador do usuario
        if (!userId) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário não preenchido')
        }

        if (!ObjectId.isValid(userId)) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário não é válido')
        }

        // Tipo do usuario (staff, elenco, user)
        if (!userType) {
            return new ResponseDTO('Error', 400, 'Tipo do usuário não preenchido')
        }

        if (userType === 'elenco') {
            const user = await elencoData.getAthleteById(userId)

            if (!user) {
                return new ResponseDTO('Error', 404, 'Usuário com este identificador não existente')
            }

            // const response = await imageData.getImageByUserId(userId, userType, imageField)

            const image = user[imageField]            
            
            return new ResponseDTO('Success', 200, 'ok', image)
        }

        if (userType === 'user') {
            const user = await usersData.getUserById(userId)

            if (!user) {
                return new ResponseDTO('Error', 404, 'Usuário com este identificador não existente')
            }

            const image = user[imageField]            
            return new ResponseDTO('Success', 200, 'ok', image)
        }

        if (userType === 'staff') {
            const user = await staffData.getStaffById(userId)

            if (!user) {
                return new ResponseDTO('Error', 404, 'Usuário com este identificador não existente')
            }

            const image = user[imageField]            
            
            return new ResponseDTO('Success', 200, 'ok', image)
        }

    } catch (error) {
        console.log(`Error: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getImageBlob = async (userId, userType, imageField) => {
    try {
        // Campo da imagem (RGFrente, RGVerso ...)
        if (!imageField) {
            return new ResponseDTO('Error', 400, 'Campo da imagem não preenchido')
        }

        // Identificador do usuario
        if (!userId) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário não preenchido')
        }

        if (!ObjectId.isValid(userId)) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário não é válido')
        }

        // Tipo do usuario (staff, elenco, user)
        if (!userType) {
            return new ResponseDTO('Error', 400, 'Tipo do usuário não preenchido')
        }

        if (userType === 'elenco') {
            const user = await elencoData.getAthleteById(userId)

            if (!user) {
                return new ResponseDTO('Error', 404, 'Usuário com este identificador não existente')
            }

            const image = user[imageField]            
            
            if (!image) {
                return new ResponseDTO('Error', 404, 'O usuário não possui uma imagem cadastrada neste campo')
            }

            const data = fs.readFileSync(image)
            const dataUrl = `data:image/png;base64,${data.toString('base64')}`

            return new ResponseDTO('Success', 200, 'ok', dataUrl);
        }

        if (userType === 'user') {
            const user = await usersData.getUserById(userId)

            if (!user) {
                return new ResponseDTO('Error', 404, 'Usuário com este identificador não existente')
            }

            const image = user[imageField]     
            
            if (!image) {
                return new ResponseDTO('Error', 404, 'O usuário não possui uma imagem cadastrada neste campo')
            }

            const data = fs.readFileSync(image)
            const dataUrl = `data:image/png;base64,${data.toString('base64')}`

            return new ResponseDTO('Success', 200, 'ok', dataUrl);
        }

        if (userType === 'staff') {
            const user = await staffData.getStaffById(userId)

            if (!user) {
                return new ResponseDTO('Error', 404, 'Usuário com este identificador não existente')
            }

            const image = user[imageField]            
            
            if (!image) {
                return new ResponseDTO('Error', 404, 'O usuário não possui uma imagem cadastrada neste campo')
            }

            const data = fs.readFileSync(image)
            const dataUrl = `data:image/png;base64,${data.toString('base64')}`

            return new ResponseDTO('Success', 200, 'ok', dataUrl);
        }


    } catch (error) {
        console.log(`Error: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.updateImageByUserId = async (userId, userType, imageField, image, imageName) => {

}

exports.deleteImageByUserId = async (userId, userType, imageField, image, imageName) => {
    
}