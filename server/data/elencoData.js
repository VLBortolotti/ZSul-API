const Elenco = require('../models/ElencoModel')

exports.postAthlete = async (teamId, name, dateOfBirth, RG, CPF, certidaoNascimento, school, category, RGFrente, RGVerso, fotoAtleta) => {
    const elenco = new Elenco({ teamId, name, dateOfBirth, RG, CPF, certidaoNascimento, school, category })

    return await elenco.save()
}

exports.getAllAthletes = async () => {
    return await Elenco.find({ }, '-__v -password')
}

exports.getAthleteById = async (id) => {
    return await Elenco.findOne({ _id: id }, '-__v')
}

exports.getAthletesByTeamId = async (id) => {
    return await Elenco.find({ teamId: id }, '-__v -password')
}

exports.findElencoByTeam = async (elencoId, teamId) => {
    return await Elenco.find({ _id: elencoId, teamId: teamId }, '-__v')
}

exports.getAthleteRGByTeamId = async (RG, teamId) => {
    return await Elenco.find({ RG: RG, teamId: teamId }, '-__V')    
}

exports.getAthleteCPFByTeamId = async (CPF, teamId) => {
    return await Elenco.find({ CPF: CPF, teamId: teamId }, '-__V')
}

exports.getAthleteCertidaoByTeamId = async (certidao, teamId) => {
    return await Elenco.find({ certidaoNascimento: certidao, teamId: teamId }, '-__v')
}

exports.getAthleteByCertidaoId = async (certidao) => {
    return await Elenco.find({ certidaoNascimento: certidao }, '-__v')
}

exports.deleteAthleteById = async (id) => {
    return await Elenco.deleteOne({ _id: id })
}

exports.cleanDatabase = async () => {
    return await Elenco.deleteMany({ })
}