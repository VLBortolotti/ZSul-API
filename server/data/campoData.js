const Campo = require('../models/CampoModel')

exports.postCampo = async (nome, cidade, endereco, linkMaps) => {
    const campo = new Campo({ nome, cidade, endereco, linkMaps })

    return await campo.save()
}

exports.getAllCampos = async () => {
    return await Campo.find({ }, '-__v')
}

exports.getCampoByCidade = async (cidade) => {
    return await Campo.find({ cidade: cidade }, '-__v')
}

exports.getCampoByNome = async (nome) => {
    return await Campo.find({ nome: nome }, '-__v')
}

exports.getCampoByEndereco = async (endereco) => {
    return await Campo.find({ endereco: endereco }, '-__v')
}

exports.getCampoById = async (id) => {
    return await Campo.findOne({ _id: id }, '-__v')
}