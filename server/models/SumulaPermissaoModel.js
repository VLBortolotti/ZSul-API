const mongoose = require('mongoose')
const database = require('../infra/database')

const sumulaPermissaoSchema = mongoose.Schema(
    { 
        campeonatoId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        campeonatoCategoria: {
            type: String,
            required: true
        },
        campeonatoName: {
            type: String,
            required: true
        }, 
        userId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        elencoId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        elencoCategoria: {
            type: String,
            required: true
        },
        elencoName: {
            type: String,
            required: true
        },
        elencoDocumento: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('SumulaPermissao', sumulaPermissaoSchema)