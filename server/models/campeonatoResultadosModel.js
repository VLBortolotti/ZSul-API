const mongoose = require('mongoose')
const database = require('../infra/database')

const campeonatoResultadosSchema = mongoose.Schema(
    { 
        teamId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        teamName: {
            type: String,
            required: true
        },
        campeonatoId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        campeonatoName: {
            type: String,
            required: true
        },
        colocacao: {
            type: String,
            required: true
        },
        vitoriasQuartaFinal: {
            type: String,
            required: true
        },
        vitoriasSemiFinal: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('campeonatoResultados', campeonatoResultadosSchema)