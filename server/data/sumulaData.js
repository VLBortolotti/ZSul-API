const e = require('cors')
const Sumula = require('../models/SumulaModel')

exports.postSumula = async (campeonatoId, campeonatoName, userId, userName, elencoId, elencoName, status) => {
    const sumula = new Sumula({ campeonatoId, campeonatoName, userId, userName, elencoId, elencoName, status })

    return sumula.save()
}

exports.countAllActiveSumulasByCampeonatoAndUserId = async (campeonatoId, userId) => {
    return Sumula.countDocuments({ campeonatoId: campeonatoId, userId: userId, status: "ativo" })
}

exports.countAllSumulasByCampeonatoAndUserId = async (campeonatoId, userId) => {
    return Sumula.countDocuments({ campeonatoId: campeonatoId, userId: userId })
}

exports.getAllSumulas = async () => {
    return await Sumula.find({ }, '-__v')
}

exports.getSumulaById = async (id) => {
    return await Sumula.find({ _id: id }, '-__v')
}

exports.getSumulaByCampeonatoId = async (id) => {
    return await Sumula.find({ campeonatoId: id }, '-__v')
}

exports.getSumulaByTeamId = async (id) => {
    return await Sumula.find({ userId: id }, '-__v')
}

exports.getSumulaByElencoId = async (id) => {
    return await Sumula.find({ elencoId: id }, '-__v')
}

exports.getSumulaByCampeonatoUserId = async (campeonatoId, userId) => {
    return await Sumula.find({ campeonatoId: campeonatoId, userId: userId }, '-__v')
}

exports.checkIfSumulaExists = async (campeonatoId, userId, elencoId) => {
    return await Sumula.find({ campeonatoId: campeonatoId, userId: userId, elencoId: elencoId })
}

exports.updateSumulaById = async (id, field, value) => {
    return await Sumula.findOneAndUpdate({ _id: id }, { field: value })
}

exports.deleteSumulaById = async (id) => {
    return await Sumula.deleteOne({ _id: id })
}

exports.cleanDatabase = async () => {
    return await Sumula.deleteMany({  })
}