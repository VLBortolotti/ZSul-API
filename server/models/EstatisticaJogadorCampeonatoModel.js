const mongoose = require('mongoose')
const database = require('../infra/database')

const estatisticaJogadorCampeonatoSchema = mongoose.Schema(
    {
        campeonatoId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        campeonatoName: {
            type: String,
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
        },
        punicao: {
            type: String,
            default: null
        }
    }
);

module.exports = mongoose.model('EstatisticaJogadorCampeonato', estatisticaJogadorCampeonatoSchema)