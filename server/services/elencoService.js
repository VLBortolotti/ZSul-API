const jwt              = require('jsonwebtoken')
const secret           = process.env.SECRET
const ObjectId         = require('mongoose').Types.ObjectId;
const elencoStatusData = require('../data/elencoStatusData')
const elencoData       = require('../data/elencoData')
const usersData        = require('../data/usersData')
const { ResponseDTO }  = require('../dtos/Response')
const fs = require('fs')

const SumulaModel = require('../models/SumulaModel')
const EstatisticaJogadorModel = require('../models/EstatisticaJogadorModel')
const SumulaPermissaoModel    = require('../models/SumulaPermissaoModel')
const TransferenciaModel      = require('../models/TransferenciaModel')

exports.postAthlete = async (teamId, name, dateOfBirth, documentNumber, school, currentDate) => {
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

        // verificar se eh RG, CPF ou Certidão de Nascimento 
        if (!documentNumber) {
            return new ResponseDTO('Error', 400, 'Número do documento (RG, CPF ou Certidão de Nascimento) não preenchido')    
        }

        if (!currentDate) {
            return new ResponseDTO('Error', 400, 'Data atual não preenchido')
        }

        const yearOfBirth = dateOfBirth.split("/")[2]
        const athleteAge  = parseInt(currentDate) - parseInt(yearOfBirth)
        // console.log(`yearOfBirth: ${yearOfBirth}`)

        if (!athleteAge) {
            return new ResponseDTO('Error', 500, 'Não foi possível calcular a categoria do atleta')
        }

        if (documentNumber.length === 11) {
            const findAthleteByTeamId = await elencoData.getAthleteCPFByTeamId(documentNumber, teamId)
            if (Object.keys(findAthleteByTeamId).length >= 1) {
                return new ResponseDTO('Error', 400, 'Este atleta já está cadastrado neste time')
            } 

            const response = await elencoData.postAthlete(teamId, name, dateOfBirth, RG=null, CPF=documentNumber, certidaoNascimento=null, school, athleteAge)

            return new ResponseDTO('Success', 200, 'ok', response)

        } else {
            const findAthleteByTeamId = await elencoData.getAthleteRGByTeamId(documentNumber, teamId)
            if (Object.keys(findAthleteByTeamId).length >= 1) {
                return new ResponseDTO('Error', 400, 'Este atleta já está cadastrado neste time')
            } 

            const response = await elencoData.postAthlete(teamId, name, dateOfBirth, RG=documentNumber, CPF=null, certidaoNascimento=null, school, athleteAge)
            
            return new ResponseDTO('Success', 200, 'ok', response)
        }

        return new ResponseDTO('Error', 500, 'Houve um erro no cadastro do elenco devido ao número do documento enviado')

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }

}

exports.postAthleteTransfer = async (teamId, name, dateOfBirth, documentNumber, school, jogadorCategory) => {
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

        // verificar se eh RG, CPF ou Certidão de Nascimento 
        if (!documentNumber) {
            return new ResponseDTO('Error', 400, 'Número do documento (RG, CPF ou Certidão de Nascimento) não preenchido')    
        }

        if (!jogadorCategory) {
            return new ResponseDTO('Error', 404, 'Não foi encontrada a categoria do jogador')
        }

        if (documentNumber.length === 11) {
            const findAthleteByTeamId = await elencoData.getAthleteCPFByTeamId(documentNumber, teamId)
            if (Object.keys(findAthleteByTeamId).length >= 1) {
                return new ResponseDTO('Error', 400, 'Este atleta já está cadastrado neste time')
            } 

            const response = await elencoData.postAthlete(teamId, name, dateOfBirth, RG=null, CPF=documentNumber, certidaoNascimento=null, school, jogadorCategory)

            return new ResponseDTO('Success', 200, 'ok', response)

        } else if (documentNumber.length === 10) {
            const findAthleteByTeamId = await elencoData.getAthleteRGByTeamId(documentNumber, teamId)
            if (Object.keys(findAthleteByTeamId).length >= 1) {
                return new ResponseDTO('Error', 400, 'Este atleta já está cadastrado neste time')
            } 

            const response = await elencoData.postAthlete(teamId, name, dateOfBirth, RG=documentNumber, CPF=null, certidaoNascimento=null, school, jogadorCategory)
            
            return new ResponseDTO('Success', 200, 'ok', response)
        
        } else if (documentNumber.length === 32) {
            const findAthleteByTeamId = await elencoData.getAthleteCertidaoByTeamId(documentNumber, teamId)
            if (Object.keys(findAthleteByTeamId).length >= 1) {
                return new ResponseDTO('Error', 400, 'Este atleta já está cadastrado neste time')
            } 

            const response = await elencoData.postAthlete(teamId, name, dateOfBirth, RG=null, CPF=null, certidaoNascimento=documentNumber, school, jogadorCategory)
            
            return new ResponseDTO('Success', 200, 'ok', response)

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
        const response1 = await elencoData.getAllAthletes()
        const response2 = await elencoStatusData.getElencoStatus()

        return new ResponseDTO('Success', 200, 'ok', [response1, response2])

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

        const response1 = await elencoData.getAthleteById(id)
        const response2 = await elencoStatusData.getElencoStatus()
        
        return new ResponseDTO('Success', 200, 'ok', [response1, response2])

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

        const response1 = await elencoData.getAthletesByTeamId(id)
        const response2 = await elencoStatusData.getElencoStatus()

        return new ResponseDTO('Success', 200, 'ok', [response1, response2])

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAthleteByCertidaoId = async (certidao) => {
    try {
        if (!certidao) {
            return new ResponseDTO('Error', 400, 'Certidão de nascimento do atleta não preenchido')
        }

        const response1 = await elencoData.getAthleteByCertidaoId(certidao)
        const response2 = await elencoStatusData.getElencoStatus()

        return new ResponseDTO('Success', 200, 'ok', [response1, response2])

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
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

        if (field == "documentNumber") {
            let documentField;

            if (athlete.RG !== null) {
                documentField = "RG"
                
            } else if (athlete.CPF !== null) {
                documentField = "CPF"
                
            } else if (athlete.certidaoNascimento !== null) {
                documentField = "certidaoNascimento"
            }            

            athlete[documentField] = value

            await athlete.validate()
            await athlete.save()

            const response = await elencoData.getAthleteById(id)

            return new ResponseDTO('Success', 200, 'ok', response)
        }

        if (field == 'name') {
            await SumulaModel.updateMany({ elencoId: id }, { $set: { elencoName: value } })

            await EstatisticaJogadorModel.updateMany({ jogadorId: id }, { $set: { jogadorName: value } })

            await SumulaPermissaoModel.updateMany({ elencoId: id }, { $set: { elencoName: value } })

            await TransferenciaModel.updateMany({ jogadorId: id }, { $set: { jogadorNome: value } })
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