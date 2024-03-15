const mongoose = require('mongoose')
const database = require('../infra/database')

const imageSchema = mongoose.Schema(
    { 
        imageName: {
            type: String,
            required: true
        },
        userId: { 
            type: String,
            required: true
        }, 
        userType: { // user, elenco, staff
            type: String,
            required: true 
        },
        imageField: { // RGFrente, RGVerso, ...
            type: String,
            required: true
        },
        imagePath: { // caminho da imagem
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('Image', imageSchema)