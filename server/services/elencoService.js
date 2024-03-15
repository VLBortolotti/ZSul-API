const jwt             = require('jsonwebtoken')
const secret          = process.env.SECRET
const ObjectId        = require('mongoose').Types.ObjectId;
const elencoData      = require('../data/elencoData')
const usersData       = require('../data/usersData')
const { ResponseDTO } = require('../dtos/Response')
const fs = require('fs')

exports.postAthlete = async (teamId, name, dateOfBirth, documentNumber, school, category) => {
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

        if (!school) {
            return new ResponseDTO('Error', 400, 'Escola não preenchida')
        }

        if (!category) {
            return new ResponseDTO('Error', 400, 'Categoria do atleta não preenchida')
        }

        // verificar se eh RG ou CPF
        if (!documentNumber) {
            return new ResponseDTO('Error', 400, 'RG/CPF não preenchido')    
        }

        if (documentNumber.length === 11) {
            const response = await elencoData.postAthlete(teamId, name, dateOfBirth, RG=null, CPF=documentNumber, school, category)

            return new ResponseDTO('Success', 200, response)

        } else if (documentNumber.length === 10) {
            const response = await elencoData.postAthlete(teamId, name, dateOfBirth, RG=documentNumber, CPF=null, school, category)
            return new ResponseDTO('Success', 200, response)
        
        } else {
            return new ResponseDTO('Error', 500, 'Houve um erro no cadastro do elenco devido ao número do documento enviado')
        }

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }

}

exports.getAllAthletes = async () => {
    try {
        const response = await elencoData.getAllAthletes()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAthleteById = async (id) => {
    try {
        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do atleta não é válido')
        }

        const response = await elencoData.getAthleteById(id)
        
        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAthletesByTeamId = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário não é válido')
        }

        const response = await elencoData.getAthletesByTeamId(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {

    }
}

exports.updateAthleteById = async (id, field, value) => {
    try {
        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do atleta não é válido')
        }

        const athlete = await elencoData.getAthleteById(id)
        if (!athlete) {
            return new ResponseDTO('Error', 404, 'Atleta com este identificador não encontrado')
        }

        if (!field) {
            return new ResponseDTO('Error', 400, 'Campo não preenchido')
        }

        if (!value) {
            return new ResponseDTO('Error', 400, 'Valor não preenchido')
        }

        athlete[field] = value

        await athlete.validate()
        await athlete.save()

        const response = await elencoData.getAthleteById(id)

        return new ResponseDTO('Success', 200, 'ok', response)
        
    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.deleteAthleteById = async (id) => {
    try {
        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do atleta não é válido')
        }

        const athlete = await elencoData.getAthleteById(id)
        if (!athlete) {
            return new ResponseDTO('Error', 404, 'Atleta com este identificador não encontrado')
        }

        const deletedAthletes = await elencoData.deleteAthleteById(id)

        if (deletedAthletes.deletedCount == 1) {
            const response = await elencoData.getAllAthletes()

            return new ResponseDTO('Success', 200, 'ok', response)
        } 
        else {
            return new ResponseDTO('Error', 500, 'Erro. Usuário não deletado.')
        }   

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.cleanDatabase = async () => {
    try {
        const response = await elencoData.cleanDatabase()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}