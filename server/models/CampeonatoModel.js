const mongoose = require('mongoose')
const database = require('../infra/database')

const campeonatoSchema = mongoose.Schema(
    { 
        name: {
            type: String,
            required: true
        },
        categoria: {
            type: String,
            required: true
        }, 
        participantes: { // colocar apenas o numero de participantes
            type: String,
            required: false
        },
        vagas: {
            type: String,
            required: true
        },
        quantidadeGrupos: {
            type: String,
            required: true
        },
        dataInicio: {
            type: String,
            required: true,
        }, 
        cidade: {
            type: String, 
            required: true
        },
        tipoCompeticao: {
            type: String,
            required: true
        },
        tipoGrupo: {
            type: String,
            required: true
        },
        tipoMataMata: {
            type: String, 
            required: true
        },
        pictureName: {  
            type: String, 
            default: null
        },
        pictureBase64: { 
            type: String, 
            default: null
        }
    }
);

module.exports = mongoose.model('Campeonato', campeonatoSchema)