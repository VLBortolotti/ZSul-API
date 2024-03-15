const campeonatoData = require('../data/campeonatoData')
const grupoTimeData  = require('../data/grupoTimeData')
const usersData = require('../data/usersData')
const grupoData = require('../data/grupoData')

const { ResponseDTO } = require('../dtos/Response')
const ObjectId        = require('mongoose').Types.ObjectId

exports.postGrupo = async (name, campeonatoId) => {
    try {
        if (!campeonatoId) {
            return new ResponseDTO('Error', 400, 'Identificador do cameponato não preenchido')
        }

        if (!ObjectId.isValid(campeonatoId)) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não é válido')
        }

        const campeonato = await campeonatoData.getCampeonatoById(campeonatoId)
        if (!campeonato) {
            return new ResponseDTO('Error', 400, 'Campeonato com este identificador não existente')
        }

        if (!name) {
            return new ResponseDTO('Error', 400, 'Nome do grupo não preenchido')
        }

        const grupoNameExists = await grupoData.findGrupoNameByCampeonatoId(name, campeonatoId)
        if (Object.keys(grupoNameExists).length > 0) {
            return new ResponseDTO('Error', 400, 'Este nome já foi pego neste campeonato')
        }

        const response = await grupoData.postGrupo(name, campeonatoId)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.postGrupoTime = async (userId, grupoId) => {
    try {
        if (!grupoId) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não preenchido')
        }

        if (!ObjectId.isValid(grupoId)) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não é válido')
        }

        const grupo = await grupoData.getGrupoById(grupoId)
        if (!grupo) {
            return new ResponseDTO('Error', 400, 'Grupo com este identificador não existente')
        }

        if (!userId) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário não preenchido')
        }

        if (!ObjectId.isValid(userId)) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário não é válido')
        }

        const user = await usersData.getUserById(userId)
        if (!user) {
            return new ResponseDTO('Error', 400, 'Campeonato com este identificador não existente')
        }

        const findTeam = await grupoTimeData.findTeamIdByGrupoId(userId, grupoId)
        if (findTeam) {
            return new ResponseDTO('Error', 400, 'Este time já está cadastrado neste grupo')
        }

        const response = await grupoTimeData.postGrupoTime(userId, user.teamName, grupoId)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllGrupos = async () => {
    try {
        const response = await grupoData.getAllGrupos()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getGrupoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não é válido')
        }

        const response = await grupoData.getGrupoById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getGruposByTeamId = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do usuário não é válido')
        }

        const response = await grupoTimeData.getGruposByTeamId(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllTeamsByGrupoId = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não é válido')
        }

        const grupo = await grupoData.getGrupoById(id)
        if (!grupo) {
            return new ResponseDTO('Error', 400, 'Grupo com este identificador não existente')
        }

        const response = await grupoTimeData.getAllTeamsByGrupoId(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getGruposByCampeonatoId = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do campeonato não é válido')
        }

        const response = await grupoData.getGruposByCampeonatoId(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.updateGrupoById = async (id, field, value) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não é válido')
        }

        const grupo = await grupoData.getGrupoById(id)
        if (!grupo) {
            return new ResponseDTO('Error', 400, 'Grupo com este identificador não existente')
        }

        if (!field) {
            return new ResponseDTO('Error', 400, 'Identificador do campo não preenchido')
        }

        if (!value) {
            return new ResponseDTO('Error', 400, 'Identificador do valor não preenchido')
        }
        
        grupo[field] = value
        await grupo.save()

        const response = await grupoData.getGrupoById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}


exports.deleteGrupoById = async (id) => {
    try {
        if (!id) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não preenchido')
        }

        if (!ObjectId.isValid(id)) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não é válido')
        }

        if (!grupoData.getGrupoById(id)) {
            return new ResponseDTO('Error', 400, 'Grupo com este identificador não existente')
        }

        const response = await grupoData.deleteGrupoById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.deleteTeamByGrupoId = async (teamId, grupoId) => {
    try {
        if (!teamId) {
            return new ResponseDTO('Error', 400, 'Identificador do time não preenchido')
        }

        if (!ObjectId.isValid(teamId)) {
            return new ResponseDTO('Error', 400, 'Identificador do time não é válido')
        }

        if (!usersData.getUserById(teamId)) {
            return new ResponseDTO('Error', 400, 'Time com este identificador não existente')
        }

        if (!grupoId) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não preenchido')
        }

        if (!ObjectId.isValid(grupoId)) {
            return new ResponseDTO('Error', 400, 'Identificador do grupo não é válido')
        }

        if (!grupoData.getGrupoById(grupoId)) {
            return new ResponseDTO('Error', 400, 'Grupo com este identificador não existente')
        }

        const response = await grupoTimeData.deleteTeamByGrupoId(teamId, grupoId)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.cleanDatabase = async () => {
    try {
        const response = await grupoData.cleanDatabase()
        
        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}