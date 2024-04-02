const e = require('cors')
const Sumula = require('../models/SumulaModel')

exports.postSumula = async (campeonatoId, campeonatoName, userId, userName, elencoId, elencoName, elencoDocumento, status) => {
    const sumula = new Sumula({ campeonatoId, campeonatoName, userId, userName, elencoId, elencoName, elencoDocumento, status })

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

exports.getSumulaByElencoIdCampeonatoIdUserId = async (campeonatoId, elencoId, userId) => {
    return await Sumula.findOne({ campeonatoId: campeonatoId, userId: userId, elencoId: elencoId })
}

exports.getSumulaByCampeonatoUserId = async (campeonatoId, userId) => {
    return await Sumula.find({ campeonatoId: campeonatoId, userId: userId }, '-__v')
}

exports.findElencoIdByCampeonatoId = async (elencoId, campeonatoId) => {
    return await Sumula.find({ elencoId: elencoId, campeonatoId: campeonatoId })
}

exports.findElencoDocumentByCampeonatoId = async (elencoDocumento, campeonatoId) => {
    return await Sumula.find({ elencoDocumento: elencoDocumento, campeonatoId: campeonatoId }, '-__v')
}

exports.findElencoCPFByCampeonatoId = async (elencoCPF, campeonatoId) => {
    return await Sumula.find({ documentNumber: elencoCPF, campeonatoId: campeonatoId })
}

exports.findElencoRGByCampeonatoId = async (elencoRG, campeonatoId) => {
    return await Sumula.find({ documentNumber: elencoRG, campeonatoId: campeonatoId })
}

exports.findElencoCertidaoByCampeonatoId = async (elencoCertidao, campeonatoId) => {
    return await Sumula.find({ documentNumber: elencoCertidao, campeonatoId: campeonatoId })
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

exports.deleteSumulaByCampeonatoIdAndUserId = async (elencoId, campeonatoId, userId) => {
    return await Sumula.deleteOne({ elencoId: elencoId, campeonatoId: campeonatoId, userId: userId })
}

exports.deleteElencoIdByTeamId = async (elencoId, userId) => {
    return await Sumula.deleteOne({ elencoId: elencoId, userId: userId })
}

exports.cleanDatabase = async () => {
    return await Sumula.deleteMany({  })
}