const Campo = require('../models/CampoModel')

exports.postCampo = async (nome, cidade, endereco, linkMaps) => {
    const campo = new Campo({ nome, cidade, endereco, linkMaps })

    return await campo.save()
}

exports.getAllCampos = async () => {
    return await Campo.find({ }, '-__v')
}