const jwt             = require('jsonwebtoken')
const secret          = process.env.SECRET
const ObjectId        = require('mongoose').Types.ObjectId;
const staffData       = require('../data/staffData')
const usersData       = require('../data/usersData')
const { ResponseDTO } = require('../dtos/Response')
const fs = require("fs")

exports.postStaff = async (teamId, name, dateOfBirth, documentNumber, cargo, image) => {
    try {
        if (!teamId) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário não preenchido')
        }

        if (!ObjectId.isValid(teamId)) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário não é válido')
        }

        const user = await usersData.getUserById(teamId)
        if (!user) {
            return new ResponseDTO('Error', 404, 'Usuário com este identificador não existente')
        }

        if (!name) {
            return new ResponseDTO('Error', 400, 'Nome não preenchido')
        }

        if (!dateOfBirth) {
            return new ResponseDTO('Error', 400, 'Data de nascimento não preenchida')
        }

        if (!cargo) {
            return new ResponseDTO('Error', 400, 'Cargo do staff não preenchido')
        }
        
        if (!documentNumber) {
            return new ResponseDTO('Error', 400, 'RG/CPF não preenchido')    
        }

        if (image) {
            const data = fs.readFileSync(image.path)
            const pictureBase64 = `data:image/png;base64,${data.toString('base64')}`
            const pictureName   = `${image.filename}`

            const response = await staffData.postStaff(teamId, name, dateOfBirth, documentNumber, cargo, pictureName, pictureBase64)

            return new ResponseDTO('Success', 200, 'ok', response)
            
        } else {
            const response = await staffData.postStaff(teamId, name, dateOfBirth, documentNumber, cargo)

            return new ResponseDTO('Success', 200, 'ok', response)
        }    

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllStaffs = async () => {
    try {
        const response = await staffData.getAllStaffs()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getStaffById = async (id) => {
    try {
        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do staff não é válido')
        }

        const response = await staffData.getStaffById(id)
        
        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getStaffsByTeamId = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário não é válido')
        }

        const response = await staffData.getStaffsByTeamId(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllStaffPunidos = async () => {
    try {
        const response = await staffData.getAllStaffPunidos()

        return new ResponseDTO('Success', 200, 'ok', response)
        
    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.updateStaffById = async (id, field, value) => {
    try {
        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do staff não é válido')
        }

        const Staff = await staffData.getStaffById(id)
        if (!Staff) {
            return new ResponseDTO('Error', 404, 'Staff com este identificador não encontrado')
        }

        if (!field) {
            return new ResponseDTO('Error', 400, 'Campo não preenchido')
        }

        if (!value) {
            return new ResponseDTO('Error', 400, 'Valor não preenchido')
        }

        Staff[field] = value

        await Staff.validate()
        await Staff.save()

        const response = await staffData.getStaffById(id)

        return new ResponseDTO('Success', 200, 'ok', response)
        
    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.deleteStaffById = async (id) => {
    try {
        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do staff não é válido')
        }

        const Staff = await staffData.getStaffById(id)
        if (!Staff) {
            return new ResponseDTO('Error', 404, 'Staff com este identificador não encontrado')
        }

        const deletedStaffs = await staffData.deleteStaffById(id)

        if (deletedStaffs.deletedCount == 1) {
            const response = await staffData.getAllStaffs()

            return new ResponseDTO('Success', 200, 'ok', response)
        } 
        else {
            return new ResponseDTO('Error', 500, 'Erro. Staff não deletado.')
        }   

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.cleanDatabase = async () => {
    try {
        const response = await staffData.cleanDatabase()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}