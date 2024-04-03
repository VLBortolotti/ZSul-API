const mongoose = require('mongoose')
const database = require('../infra/database')

const elencoStatusSchema = mongoose.Schema(
    { 
        status: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('ElencoStatus', elencoStatusSchema)