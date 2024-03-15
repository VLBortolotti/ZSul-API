const Grupo = require('../models/GrupoModel')

exports.postGrupo = async (name, campeonatoId) => {
    const grupo = new Grupo({ name, campeonatoId })

    return await grupo.save()
}

exports.getAllGrupos = async () => {
    return await Grupo.find({  }, '-__v')
}

exports.getGrupoById = async (id) => {
    return await Grupo.findOne({ _id: id }, '-__v' )
}

exports.getGruposByTeamId = async (id) => {
    return await Grupo.find({ userId: id }, '-__v')
}

exports.getGruposByCampeonatoId = async (id) => {
    return await Grupo.find({ campeonatoId: id }, '-__v')
}

exports.findUserByCampeonatoId = async (userId, campeonatoId) => {
    return await Grupo.find({ campeonatoId: campeonatoId, userId: userId })
}

exports.findGrupoNameByCampeonatoId = async (name, campeonatoId) => {
    return await Grupo.find({ name: name, campeonatoId: campeonatoId })
}

exports.deleteGrupoById = async (id) => {
    return await Grupo.deleteOne({ _id: id })
}

exports.cleanDatabase = async () => {
    return await Grupo.deleteMany({ })
}