const mongoose = require('mongoose')
const database = require('../infra/database')

const elencoSchema = mongoose.Schema(
    { 
        teamId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        }, 
        dateOfBirth: {
            type: String, // date
            required: true 
        },
        RG: {
            type: String,
            default: null
        },
        CPF: {
            type: String,
            default: null
        },
        school: {
            type: String,
            required: true
        },
        category: {
            type: String, 
            required: true
        },
        RGFrente: {
            type: String,
            default: null
        },
        RGFrenteBase64: {
            type: String,
            default: null
        },
        RGVerso: {
            type: String,
            default: null
        },
        RGVersoBase64: {
            type: String,
            default: null
        },
        fotoAtleta: {
            type: String,
            default: null
        },
        fotoAtletaBase64: {
            type: String, 
            default: null
        }
    }
);

module.exports = mongoose.model('Elenco', elencoSchema)