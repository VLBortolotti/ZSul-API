const GrupoTime = require('../models/GrupoTimeModel')

exports.postGrupoTime = async (teamId, teamName, grupoId) => {
    const grupoTime = new GrupoTime({ teamId, teamName, grupoId })

    return await grupoTime.save()
}

exports.getAllTeamsByGrupoId = async (grupoId) => {
    return await GrupoTime.find({ grupoId: grupoId }, '-__v')
}

exports.getGruposByTeamId = async (teamId) => {
    return await GrupoTime.find({ teamId: teamId })
}

exports.findTeamIdByGrupoId = async (teamId, grupoId) => {
    return await GrupoTime.findOne({ teamId: teamId, grupoId: grupoId })
}

exports.deleteTeamByGrupoId = async (teamId, grupoId) => {
    return await GrupoTime.deleteOne({ teamId: teamId, grupoId: grupoId })
}