const mongoose = require('mongoose')
const database = require('../infra/database')

const campoSchema = mongoose.Schema(
    { 
        nome: {
            type: String,
            required: true
        }, 
        cidade: {
            type: String,
            required: true
        },
        endereco: {
            type: String,
            required: true
        },
        linkMaps: {
            type: String,
            required: true
        },
        fileName: {
            type: String, // Buffer
            default: null
        },
        fileType: {
            type: String,
            default: null
        },
        fileBase64: {
            type: String,
            default: null
        }
    }
);

module.exports = mongoose.model('Campo', campoSchema)