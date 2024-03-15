const mongoose = require('mongoose')
const database = require('../infra/database')

const estatisticaJogoSchema = mongoose.Schema(
    {
        campeonatoId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        jogoId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        vencedor: {         // caso empate = 'empate' - caso não, vencedorId
            type: String,
            required: true
        },
        userCasaId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        userCasaNome: {
            type: String,
            required: true
        },
        userCasaGols: {
            type: String,
            required: true
        },
        userForaId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        userForaNome: {
            type: String,
            required: true
        },
        userForaGols: {
            type: String, 
            required: true
        },
    }
);

module.exports = mongoose.model('EstatisticaJogo', estatisticaJogoSchema)