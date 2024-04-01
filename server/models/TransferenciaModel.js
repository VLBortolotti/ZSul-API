const mongoose = require('mongoose')
const database = require('../infra/database')

const TransferenciaSchema = mongoose.Schema(
    {
        campeonatoId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        jogadorId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        jogadorNome: {
            type: String, 
            required: true
        },
        timeAtualId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        nomeTime: {
            type: String,
            required: true
        },
        novoTimeId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        motivo: {
            type: String,
            required: true
        },
        dataDeSolicitcao: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('Transferencia', TransferenciaSchema)