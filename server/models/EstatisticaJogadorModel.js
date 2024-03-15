const mongoose = require('mongoose')
const database = require('../infra/database')

const estatisticaJogadorSchema = mongoose.Schema(
    {
        campeonatoId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        campeonatoName: {
            type: String,
            required: true
        },
        jogoId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        teamId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        teamName: {
            type: String,
            required: true
        },
        jogadorId: {
            type: mongoose.Types.ObjectId,
            required: true    
        },
        jogadorName: {
            type: String,
            required: true
        },
        gols: {
            type: String,
            required: true
        },
        numeroCartoesAmarelo: {
            type: String,
            required: true
        },
        numeroCartoesVermelho: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('EstatisticaJogador', estatisticaJogadorSchema)