const Transferencia = require('../models/TransferenciaModel')

exports.postTransferencia = async (campeonatoId, jogadorId, jogadorNome, timeAtualId, nomeTime, novoTimeId, motivo, dataDeSolicitcao) => {
    const transferencia = new Transferencia({
        campeonatoId, jogadorId, jogadorNome, timeAtualId, nomeTime, novoTimeId, motivo, dataDeSolicitcao
    })

    return await transferencia.save()
}

exports.getAllTransferencias = async () => {
    return await Transferencia.find({ }, '-__v')
}

exports.getTransferenciaById = async (id) => {
    return await Transferencia.findOne({ _id: id }, '-__v')
}

exports.reprovarTransferenciaById = async (id) => {
    return await Transferencia.deleteOne({ _id: id })
}

exports.cleanDatabase = async () => {
    return await Transferencia.deleteMany({  })
}